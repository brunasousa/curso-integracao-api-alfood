import { Box, Button, FormControl, TextField, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

export default function FormularioPrato() {
    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);

    useEffect(() => {
        http.get<{ tags: ITag[] }>(`tags/`)
            .then((resposta) => {
                setTags(resposta.data.tags);
        });
        http.get<IRestaurante[]>(`restaurantes/`)
        .then((resposta) => {
            setRestaurantes(resposta.data);
        });
    }, []);

    function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const formData = new FormData();
        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);

        if (imagem) {
            formData.append('imagem', imagem);
        }
        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then( () => {
            setNomePrato('');
            setDescricao('');
            setTag('');
            setRestaurante('');
            alert('Prato cadastrado com sucesso.')
        }).catch( erro => {
            console.log(erro);
        })
    }

    function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField id="nome-prato"
                    label="Nome do Prato" variant="standard"
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    fullWidth
                    required 
                    margin="dense"/>
                
                <TextField id="descricao-prato"
                    label="Descricao do Prato" variant="standard"
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    fullWidth
                    required 
                    margin="dense"/>
               
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag"></InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={ evento => setTag(evento.target.value)}>
                        {tags.map( tag => 
                            <MenuItem value={tag.value} key={tag.id}>
                                {tag.value}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante"></InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={ evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map( restaurante => 
                            <MenuItem value={restaurante.id} key={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <input type="file" onChange={evento => selecionarArquivo(evento)} />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    );
}