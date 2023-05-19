import { useNavigate } from "react-router-dom"
import Logo from "../../assets/logo.svg"
import "./Login.css"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { setItem, getItem } from "../../utils/storage"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const goToRegister = () => {
        navigate('/register')
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!email || !senha) {
                console.log("É necessário preencher todos os campos do formulário");
                return
            }
            const response = await api.post('/login', {
                email,
                senha
            })

            const { token, usuario } = response.data
            setItem('token', token)
            setItem('userId', usuario.id)
            setItem('name', usuario.nome)

            navigate('/home')


            console.log(response.data);
            console.log(usuario);
        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }
    useEffect(() => {
        const token = getItem('token');
        if (token) {
            navigate('/home')
        }
    })

    return (
        <div className="page-login">

            <header>
                <img src={Logo} alt="logo" className="logo" />
            </header>
            <main>
                <div className="infos-left">
                    <h1>
                        Controle suas <strong>finanças</strong>, <br />
                        sem planilha chata.
                    </h1>

                    <p>Organizar as suas finanças nunca foi tão fácil,<br />
                        com o DINDIN, você tem tudo num único lugar <br />
                        e em um clique de distância.</p>
                    <button onClick={goToRegister}>
                        Cadastre-se
                    </button>

                </div>

                <div className="form-login-right">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>

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

                        <button>Entrar</button>
                    </form>
                </div>
            </main >
        </div >
    )
}