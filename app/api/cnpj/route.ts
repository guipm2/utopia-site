import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cnpj = searchParams.get("cnpj")

    if (!cnpj) {
      return NextResponse.json(
        { success: false, error: "CNPJ não informado" },
        { status: 400 }
      )
    }

    // Remove caracteres não numéricos
    const cnpjClean = cnpj.replace(/\D/g, "")

    // Valida se tem 14 dígitos
    if (cnpjClean.length !== 14) {
      return NextResponse.json(
        { success: false, error: "CNPJ deve ter 14 dígitos" },
        { status: 400 }
      )
    }

    // Consulta a API da ReceitaWS
    const response = await fetch(
      `https://receitaws.com.br/v1/cnpj/${cnpjClean}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )

    const data = await response.json()

    // Verifica se a API retornou erro
    if (data.status === "ERROR") {
      return NextResponse.json({
        success: false,
        valid: false,
        error: data.message || "CNPJ não encontrado",
      })
    }

    // CNPJ válido - retorna dados da empresa
    return NextResponse.json({
      success: true,
      valid: true,
      company: {
        nome: data.nome || "",
        fantasia: data.fantasia || "",
        situacao: data.situacao || "",
        tipo: data.tipo || "",
        porte: data.porte || "",
        natureza_juridica: data.natureza_juridica || "",
        atividade_principal: data.atividade_principal?.[0]?.text || "",
        logradouro: data.logradouro || "",
        numero: data.numero || "",
        bairro: data.bairro || "",
        municipio: data.municipio || "",
        uf: data.uf || "",
        cep: data.cep || "",
        telefone: data.telefone || "",
        email: data.email || "",
      },
    })
  } catch (error) {
    console.error("Erro ao consultar CNPJ:", error)
    return NextResponse.json(
      { success: false, error: "Erro ao consultar CNPJ" },
      { status: 500 }
    )
  }
}
