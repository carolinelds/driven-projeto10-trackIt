import * as React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteButton from "./../assets/images/delete-button.svg";
import TokenContext from '../contexts/TokenContext';
import axios from 'axios';
import { useContext } from 'react';

export default function BotaoApagar(props) {
    const [open, setOpen] = React.useState(false);
    const { id, name, requisicaoAxios } = props;
    const { token } = useContext(TokenContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function apagarHabito(id) {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
        promise.then(() => requisicaoAxios());
        promise.catch(err => console.log(err.response.status));
        setOpen(false);
    }

    return (
        <Div>
            <Button variant="text" onClick={handleClickOpen}>
                <img src={DeleteButton} alt="Botão: aperte aqui para apagar esse hábito" />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Gostaria de apagar esse hábito?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        O hábito "{name}" será apagado.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => apagarHabito(id)} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </Div>
    );
}

const Div = styled.div`
    
    Button:first-of-type {
        height: 20px;
        background-color: inherit;
        display: flex;
        justify-content: right;
        padding: 0px;
    }
    
    Dialog {
        border-radius: 10px;
    }
   


`;