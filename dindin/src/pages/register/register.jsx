import Logo from "../../assets/logo.svg"
import "./register.css"
import api from "../../services/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const goToLogin = () => {
        navigate('/')
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!nome || !email || !senha || !confirmarSenha) {
                console.log("É necessário preencher todos os campos do formulário");
                return
            }
            if (senha !== confirmarSenha) {
                console.log("A confirmação de senha está incorreta");
                return
            }
            const response = await api.post('/usuario', {
                nome,
                email,
                senha
            })
            console.log(response);
            goToLogin()
        } catch (error) {

        }
    }

    return (
        <div className="page-register">
            <header>
                <img src={Logo} alt="logo" className="logo" />
            </header>
            <div className="form-register">
                <form onSubmit={handleSubmit}>
                    <h1>Cadastre-se</h1>

                    <div className="form-input">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="form-input">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-input">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div className="form-input">
                        <label htmlFor="password-confirmation">Confirmação de Senha</label>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />
                    </div>
                    <div className="div-buttons">
                        <button>Cadastar</button>
                        <a href="/" onClick={goToLogin} >Já tem uma conta? Clique aqui </a>
                    </div>
                </form>
            </div>
        </div>
    )
}