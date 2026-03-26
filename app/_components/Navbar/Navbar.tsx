'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/AuthProvider";
import { ProfileDropdownButton } from "./ProfileDropdownButton";

type LinkProps = {
    id: number,
    title: string,
    href: string
    authPrivate?: boolean
}

export default function Navbar() {
    const router = useRouter();
    const { autenticado, loading, logout, usuario, organizador } = useAuth();

    // Links da Navbar (o OxentePass é estático)
    const links = [
        { id: 1, title: "Eventos", href: "/" },
        { id: 2, title: "Cidades", href: "/cidade" },
        { id: 3, title: "Categorias", href: "/categoria" },
        { id: 4, title: "Organização", href: "/organizador", authPrivate: true },
    ]

    const handleLogout = async () => {
        await logout();
        router.push("/");
        router.refresh();
    };

    return (
        <nav className="navbar flex items-center justify-between">

            {/* Links Navbar */}
            <ul className="flex items-center gap-6">
                {/* Logo */}
                <li className="">
                    <Link
                        href="/"
                        className="text-xl mr-4 cursor-pointer flex items-center gap-2"
                    >
                        <div>
                            <img src="/logo.svg" alt="logo" width={50} />
                        </div>
                        <div>
                            <span className="font-bold text-yellow-300">Oxente</span>
                            <span className="font-semibold">Pass</span>
                        </div>
                    </Link>
                </li>

                {
                    links.map(
                        (link: LinkProps) => (
                            link.authPrivate && !organizador ?

                                <></> :

                                <li key={link.id} >
                                    <Link className="text-lg cursor-pointer" href={link.href} >
                                        {link.title}
                                    </Link>
                                </li>
                        )
                    )
                }
            </ul>

            {/* Menu Perfil */}
            {
                loading ?
                    (
                        <span className="text-sm text-white/80">
                            Carregando...
                        </span>
                    ) :
                    <ProfileDropdownButton
                        autenticado={autenticado}
                        nomeUsuario={usuario?.nome}
                        onSair={handleLogout}
                    />
            }

        </nav >
    );
}
