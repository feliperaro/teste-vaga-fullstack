import { cpf, cnpj } from "cpf-cnpj-validator";

export const isCpfCnpjValid: Function = (value: string) =>
  cpf.isValid(value) || cnpj.isValid(value);
