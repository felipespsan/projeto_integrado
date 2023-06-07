fetch('/api/is_logged_in')
  .then(response => response.json())
  .then(data => {
    if (data.logged_in) {
      console.log("O usuário está logado");
    } else {
      console.log("O usuário não está logado");
    }
  });
