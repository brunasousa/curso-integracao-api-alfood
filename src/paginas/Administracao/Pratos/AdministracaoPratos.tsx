import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export default function AdministracaoPratos() {
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then((resposta) => {
                setPratos(resposta.data);
            })
    }, []);

    function exluirPrato(pratoAhSerExluido: IPrato) {
        http.delete(`pratos/${pratoAhSerExluido.id}/`)
            .then(() => {
                const listaPratos = pratos.filter((prato)=> prato.id !== pratoAhSerExluido.id);
                setPratos([...listaPratos]);
            });
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                <a href={prato.imagem} rel="noreferrer" target="_blank">Ver imagem</a>
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => exluirPrato(prato)}>
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