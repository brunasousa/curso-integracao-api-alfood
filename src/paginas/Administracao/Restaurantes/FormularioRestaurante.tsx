import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
    const params = useParams();
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    useEffect(() => {
        console.log('Restaurante', params.id)
        if (params.id) {
            http.get<IRestaurante>(`restaurantes/${params.id}/`)
                .then((resposta) => {
                    setNomeRestaurante(resposta.data.nome);
                })
        }
    }, [params])

    function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (params.id) {
            http.put(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                });
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                });
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField id="nome-restaurante"
                    label="Nome do Restaurante" variant="standard"
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    fullWidth
                    required />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    );
}