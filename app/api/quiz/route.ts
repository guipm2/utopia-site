import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // ─── Configurações ───────────────────────────────────────────────
    const WEBHOOK_URL = process.env.WEBHOOK_QUIZ_URL
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY

    // ─── Normalização dos dados ───────────────────────────────────────
    const phoneNumbers = data.phone?.replace(/\D/g, "") || ""
    const cpfNumbers = data.cpf?.replace(/\D/g, "") || ""
    const cnpjNumbers = data.companyCNPJ?.replace(/\D/g, "") || ""

    const nameParts = (data.name || "").trim().split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    // ─── Payload para o Supabase ──────────────────────────────────────
    const supabaseRow = {
      // Metadados
      submitted_at: new Date().toISOString(),
      source: "utopia-quiz",

      // Dados Pessoais
      full_name: data.name || "",
      first_name: firstName,
      last_name: lastName,
      email: data.email || "",
      phone_formatted: data.phone || "",
      phone_raw: phoneNumbers,
      phone_ddd: phoneNumbers.slice(0, 2),
      phone_number: phoneNumbers.slice(2),
      cpf_formatted: data.cpf || "",
      cpf_raw: cpfNumbers,

      // Dados da Empresa
      company_name: data.companyName || "",
      company_cnpj_formatted: data.companyCNPJ || "",
      company_cnpj_raw: cnpjNumbers,
      company_segment: data.companySegment || "",
      company_website: data.companyWebsite || "",
      company_social: data.companySocial || "",
      company_description: data.companyDescription || "",

      // Qualificação
      main_challenge: data.mainChallenge || "",
      motivation: data.motivation || "",
      focus_area: data.focusArea || "",
      expected_result: data.expectation || "",
      urgency_level: data.urgency || "",

      // Status inicial
      status: "new",
    }

    // ─── Payload para o n8n Webhook ───────────────────────────────────
    const webhookPayload = {
      meta: {
        source: "utopia-quiz",
        submitted_at: supabaseRow.submitted_at,
        version: "1.0",
      },
      lead: {
        full_name: supabaseRow.full_name,
        first_name: supabaseRow.first_name,
        last_name: supabaseRow.last_name,
        email: supabaseRow.email,
        phone: {
          formatted: supabaseRow.phone_formatted,
          raw: supabaseRow.phone_raw,
          country_code: "55",
          ddd: supabaseRow.phone_ddd,
          number: supabaseRow.phone_number,
        },
        cpf: {
          formatted: supabaseRow.cpf_formatted,
          raw: supabaseRow.cpf_raw,
        },
      },
      company: {
        name: supabaseRow.company_name,
        cnpj: {
          formatted: supabaseRow.company_cnpj_formatted,
          raw: supabaseRow.company_cnpj_raw,
        },
        segment: supabaseRow.company_segment,
        website: supabaseRow.company_website,
        social_media: supabaseRow.company_social,
        description: supabaseRow.company_description,
      },
      qualification: {
        main_challenge: supabaseRow.main_challenge,
        motivation: supabaseRow.motivation,
        focus_area: supabaseRow.focus_area,
        expected_result: supabaseRow.expected_result,
        urgency_level: supabaseRow.urgency_level,
      },
      raw_data: data,
    }

    // ─── Envia em paralelo: Supabase + Webhook ────────────────────────
    const promises: Promise<unknown>[] = []

    // 1. Insert no Supabase (obrigatório)
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error("Variáveis do Supabase não configuradas")
      return NextResponse.json(
        { success: false, error: "Supabase não configurado" },
        { status: 500 }
      )
    }

    promises.push(
      fetch(`${SUPABASE_URL}/rest/v1/QUIZ`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify(supabaseRow),
      }).then(async (res) => {
        if (!res.ok) {
          const errText = await res.text()
          console.error("Erro Supabase:", res.status, errText)
          throw new Error(`Supabase error ${res.status}: ${errText}`)
        }
        console.log("Supabase: lead inserido na tabela QUIZ")
      })
    )

    // 2. Webhook n8n (opcional — não bloqueia se falhar)
    if (WEBHOOK_URL) {
      promises.push(
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
        }).then(async (res) => {
          if (!res.ok) console.error("Webhook n8n falhou:", res.status)
          else console.log("Webhook n8n: dados enviados com sucesso")
        }).catch((err) => {
          console.error("Erro ao chamar webhook n8n:", err)
        })
      )
    }

    // Aguarda o Supabase (e o webhook, se disponível)
    await Promise.all(promises)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro na API do quiz:", error)
    return NextResponse.json(
      { success: false, error: "Erro interno ao processar o quiz" },
      { status: 500 }
    )
  }
}
