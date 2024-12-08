export const isAuthenticated = async (username, password) => {
    try {
      const usuario = "admin";
      const senha = "AssetHub"

      if (username === usuario && password === senha) {
        return true
      } else {
        return false
      }

     //const response = await fetch('http://54.241.121.31:6969/token', {
     //  method: 'POST',
     //  headers: {
     //    'Content-Type': 'application/json',
     //  },
     //  body: JSON.stringify({ username, hash: password }),
     //});
     //console.log(response.status + ": Chamada a api")

    //  if (response.status == 200) {
    //    console.log("Usuario logado")
    //    localStorage.setItem('access_token', response.data['access_token']);
    //    return response.data["access_token"]
    //  } else {
    //    console.log("Usuário inválido!")
    //  return false;
    //  }
    } catch (error) {
      console.error('Erro ao enviar requisição: ', error);
      throw new Error('Erro ao enviar requisição');
    }
  };