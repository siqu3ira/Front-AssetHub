import axios from "axios";

const baseUrl = 'http://ec2-18-230-23-141.sa-east-1.compute.amazonaws.com:6969/';

const listarHosts = async () => {
    try {
        const response = await axios.get(baseUrl + 'hosts/get_hosts');
        return response.data.Hosts;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

const listarHardware = async () => {
    try {
        const response = await axios.get(baseUrl + 'hardware/get_hardwares');
        return response.data.Hardwares;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

const qtdHardware = async () => {
    try {
        const response = await axios.get(baseUrl + 'hardware/get_hardware_count');

        if (response.data && 'Hardware_Count' in response.data) {
            return response.data;
        } else {
            console.error("Estrutura de dados inesperada: ", response.data);
            throw new Error("A resposta da API não contém o campo 'Hardware_Count'.");
        }
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        throw error;
    }
};

const qtdServidores = async () => {
    try {
        const response = await axios.get(baseUrl + 'hosts/get_host_ostype_count');

        if (response.data && 'Linux_Hosts' in response.data && 'Windows_Hosts' in response.data) {
            return response.data;
        } else {
            console.error("Estrutura de dados inesperada: ", response.data);
            throw new Error("A resposta da API não contém os campos 'Linux_Hosts' ou 'Windows_Hosts'.");
        }
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        throw error;
    }
};

const getHost = async (uuid) => {
    try {
        const response = await axios.get(baseUrl + 'hosts/get_host/' + uuid);
        return response.data.Host;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};

const attDescHost = async (uuid, desc) => {
    try {
        if (!uuid || !desc) {
            console.error("UUID ou descrição inválidos:", { uuid, description });
            return;
        }

        const url = `${baseUrl}hosts/update_host_description/${uuid}`;
        const params = { new_description: desc }; // Adiciona o parâmetro na query string

        console.log("URL e parâmetros:", { url, params });

        const response = await axios.put(url, null, { params });
        console.log("Descrição atualizada com sucesso:", response.data);
    } catch (error) {
        console.error("Erro ao atualizar a descrição do host:", error.response?.data || error.message);
    }
};

const getMediaCpu = async () => {
    try {
        const response = await axios.get(baseUrl + 'dashboard/memory_info');
        return response.data;
        console.log("Média" + response)
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
    }
};


export {
    listarHosts, qtdHardware, qtdServidores, getHost, attDescHost, getMediaCpu, listarHardware
}