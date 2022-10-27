import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function AdministracaoRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get('restaurantes/')
            .then((resposta) => {
                setRestaurantes(resposta.data);
            })
    }, []);

    function exluirRestaurante(restauranteAhSerExluido: IRestaurante) {
        http.delete(`restaurantes/${restauranteAhSerExluido.id}/`)
            .then(() => {
                const listaRestaurantes = restaurantes.filter((restaurante)=> restaurante.id !== restauranteAhSerExluido.id);
                setRestaurantes([...listaRestaurantes]);
            });
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => exluirRestaurante(restaurante)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}