interface DataDocument {
  title: string;
  filename: string;
  file_url: string;
  size: number;
}

export interface DataLinkDocument {
  id: string;
  url: string;
  documents: Array<DataDocument>;
}

export type DataLinkDocuments = DataLinkDocument[];

export interface InfoNota {
  numero_nota: string;
  data_emissao: string;
  valor_nota: string;
}

export interface InfoCarro {
  nome_carro: string;
  imagens_carro: string[];
}

export interface Parcela {
  id: string;
  identificacao: string;
  parcela: string;
  vencimento: string;
  situacao: string;
  valor: string;
}

export type InfoParcelas = Parcela[];

export interface InfoDestinatario {
  nome: string;
  cpf_cnpj: string;
}

export interface InfoEmpresa {
  nome: string;
  cnpj: string;
  email: string;
  maps: string;
  image: string;
}
