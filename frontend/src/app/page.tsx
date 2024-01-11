"use server";

import Image from "next/image";
import styles from "./page.module.css";

async function getData() {
  const res = await fetch("http://localhost:3000/api/data");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json().then((data) => data.data);
  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className={styles.main}>
      <div>
        <Image
          className={styles.logo}
          src="/logo-kronoos.png"
          alt="Kronoos Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className={styles.center}>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((e: any) => {
            return (
              <li key={e.row}>
                <span>{`Número Instituição: ${e.nrInst}`}</span>
                <br />
                <span>{`Número Agência: ${e.nrAgencia}`}</span>
                <br />
                <span>{`Código Cliente: ${e.cdClient}`}</span>
                <br />
                <span>{`Nome Cliente: ${e.nmClient}`}</span>
                <br />
                <span>{`CPF/CNPJ: ${e.nrCpfCnpj}`}</span>
                <br />
                <span>{`Número Contrato: ${e.nrContrato}`}</span>
                <br />
                <span>{`Data Contrato: ${e.dtContrato}`}</span>
                <br />
                <span>{`Quantidade Prestações: ${e.qtPrestacoes}`}</span>
                <br />
                <span>{`Valor Total: ${e.vlTotal}`}</span>
                <br />
                <span>{`Código Produto: ${e.cdProduto}`}</span>
                <br />
                <span>{`Descrição Produto: ${e.dsProduto}`}</span>
                <br />
                <span>{`Código Carteira: ${e.cdCarteira}`}</span>
                <br />
                <span>{`Descrição Carteira: ${e.dsCarteira}`}</span>
                <br />
                <span>{`Número Proposta: ${e.nrProposta}`}</span>
                <br />
                <span>{`Número Prestação: ${e.nrPresta}`}</span>
                <br />
                <span>{`Tipo Prestação: ${e.tpPresta}`}</span>
                <br />
                <span>{`Número Sequência Prestação: ${e.nrSeqPre}`}</span>
                <br />
                <span>{`Data Vencimento Prestação: ${e.dtVctPre}`}</span>
                <br />
                <span>{`Valor Prestação: ${e.vlPresta}`}</span>
                <br />
                <span>{`Valor Mora: ${e.vlMora}`}</span>
                <br />
                <span>{`Valor Multa: ${e.vlMulta}`}</span>
                <br />
                <span>{`Valor Outros Acréscimos: ${e.vlOutAcr}`}</span>
                <br />
                <span>{`Valor IOF: ${e.vlIof}`}</span>
                <br />
                <span>{`Valor Desconto: ${e.vlDescon}`}</span>
                <br />
                <span>{`Valor Atual: ${e.vlAtual}`}</span>
                <br />
                <span>{`ID Situação: ${e.idSituac}`}</span>
                <br />
                <span>{`ID Situação Vencimento: ${e.idSitVen}`}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
