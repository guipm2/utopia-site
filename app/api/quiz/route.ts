import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // URL do webhook está segura no servidor
    const WEBHOOK_URL = process.env.WEBHOOK_QUIZ_URL

    if (!WEBHOOK_URL) {
      console.error("WEBHOOK_QUIZ_URL não configurada")
      return NextResponse.json(
        { success: false, error: "Webhook não configurado" },
        { status: 500 }
      )
    }

    // Extrai apenas os números do telefone, CPF e CNPJ
    const phoneNumbers = data.phone?.replace(/\D/g, "") || ""
    const cpfNumbers = data.cpf?.replace(/\D/g, "") || ""
    const cnpjNumbers = data.companyCNPJ?.replace(/\D/g, "") || ""

    // Schema JSON organizado
    const payload = {
      // Metadados
      meta: {
        source: "utopia-quiz",
        submitted_at: new Date().toISOString(),
        version: "1.0",
      },

      // Dados Pessoais do Lead
      lead: {
        full_name: data.name || "",
        first_name: data.name?.split(" ")[0] || "",
        last_name: data.name?.split(" ").slice(1).join(" ") || "",
        email: data.email || "",
        phone: {
          formatted: data.phone || "",
          raw: phoneNumbers,
          country_code: "55",
          ddd: phoneNumbers.slice(0, 2),
          number: phoneNumbers.slice(2),
        },
        cpf: {
          formatted: data.cpf || "",
          raw: cpfNumbers,
        },
      },

      // Dados da Empresa
      company: {
        name: data.companyName || "",
        cnpj: {
          formatted: data.companyCNPJ || "",
          raw: cnpjNumbers,
        },
        segment: data.companySegment || "",
        website: data.companyWebsite || "",
        social_media: data.companySocial || "",
        description: data.companyDescription || "",
      },

      // Necessidades e Qualificação
      qualification: {
        main_challenge: data.mainChallenge || "",
        motivation: data.motivation || "",
        focus_area: data.focusArea || "",
        expected_result: data.expectation || "",
        urgency_level: data.urgency || "",
      },

      // Dados brutos (backup)
      raw_data: data,
    }

    // Envia para o webhook
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("Erro no webhook:", response.status, response.statusText)
      return NextResponse.json(
        { success: false, error: "Erro ao enviar dados" },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro na API:", error)
    return NextResponse.json(
      { success: false, error: "Erro interno" },
      { status: 500 }
    )
  }
}
