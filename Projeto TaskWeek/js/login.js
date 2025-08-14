function Login(){
    var email = document.getElementById("email_user").value;
    var senha = document.getElementById("senha_user").value;
    var audioErro = new Audio('erro.mpeg');

    if(email === "gm.user@gmail.com") {       
        if(senha === "senai@123"){
            window.location.href = "gerenciador.html";
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Senha Incorreta!",          
            });
    
            // Configurações do áudio
            audioErro.volume = 0.3;
            audioErro.play().catch(e => console.log("Não foi possível reproduzir o som: ", e));
        }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "E-mail Incorreto!",
        });
        
        // Configurações do áudio
        audioErro.volume = 0.3;
        audioErro.play().catch(e => console.log("Não foi possível reproduzir o som: ", e));
    }
    }