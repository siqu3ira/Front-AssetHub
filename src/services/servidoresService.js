import { qtdServidores } from "../api";


export async function qtdLinux() {
    try {
        const servidores = await qtdServidores();
        const servidoresLinux = servidores?.Linux_Hosts;

        console.log("Quantidade de servidores Linux:", servidoresLinux);

        return servidoresLinux;
    } catch (error) {
        console.error("Erro ao obter a quantidade de servidores Linux:", error);
        return 0;
    }
}

export async function qtdWindows(dados) {

    try {
        const servidores = await qtdServidores();
        const servidoresWindows = servidores?.Windows_Hosts;

        console.log("Quantidade de servidores Windows:", servidoresWindows);

        return servidoresWindows;
    } catch (error) {
        console.error("Erro ao obter a quantidade de servidores Windows:", error);
        return 0;
    }
}

export function totalServidoresVirtuais(dados) {

    let total = qtdWindows(dados) + qtdLinux(dados);

    return total;
}