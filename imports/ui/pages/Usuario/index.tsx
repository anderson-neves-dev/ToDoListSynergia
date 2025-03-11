import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styled from "styled-components";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";
import ModalConfirmacao from "/client/components/ModalConfirmacao";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadProfilePicture from "/client/components/InputImagem";
import { MeteorUser, UserEdit } from "/client/interfaces/meteorUser";

const style = {
  fontFamily: "Saira, sans-serif",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: relative;
`;

export default function Usuario() {
  const user = useTracker<MeteorUser | null>(() => Meteor.user());
  const [userEdit, setUserEdit] = React.useState<UserEdit>({
    nome: user.profile?.nome || "",
    aniversario: user.profile?.aniversario.split("T")[0] || "",
    email: user.profile?.email || "",
    empresa: user.profile?.empresa || "",
    sexo: user.profile?.sexo || "",
    profileImage: user.profile?.profileImage || "",
  });
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(true);

  const setProfileImage = (profileImageBase64: string) =>
    setUserEdit((user) => ({
      ...user,
      profileImage: profileImageBase64,
    }));
  const handleCloseModal = () => setOpen(false);

  // Função para atualizar o useState
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setUserEdit((user) => ({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Função para atualizar os dados
  const handleSave = async () => {
    const aniversarioIso = userEdit.aniversario
      ? new Date(`${userEdit.aniversario}T00:00:00.000Z`).toISOString()
      : "";

    try {
      await Meteor.callAsync("user.updateProfile", {
        ...userEdit,
        aniversario: aniversarioIso,
      });

      console.log("Usuário atualizado com sucesso");
      setEdit(true);
      nav("/usuario");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <Box sx={style}>
        <StyledDiv>
          <div>
            <UploadProfilePicture
              initialImage={userEdit.profileImage}
              onImageChange={setProfileImage}
              disabled={edit}
            />
          </div>{" "}
          <Typography
            sx={{ fontSize: "20px", fontFamily: "Saira, sans-serif" }}
          >
            {" "}
            {user.username}
          </Typography>
        </StyledDiv>

        <TextField
          required
          fullWidth
          label="Nome"
          name="nome"
          value={userEdit.nome}
          onChange={handleChange}
          margin="normal"
          disabled={edit}
        />
        <TextField
          required
          fullWidth
          type="email"
          label="Email"
          name="email"
          value={userEdit.email}
          onChange={handleChange}
          margin="normal"
          disabled={edit}
          sx={{
            "&.Mui-disabled": {
              background: "red",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "16px",
            justifyItems: "center",
          }}
        >
          <TextField
            fullWidth
            required
            type="date"
            label="Data de Nascimento"
            name="aniversario"
            value={userEdit.aniversario}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            disabled={edit}
            sx={{ width: "fit" }}
          />

          <FormControl fullWidth sx={{ marginTop: "16px" }}>
            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="sexo"
              value={userEdit.sexo}
              label="Sexo"
              onChange={handleChange}
              disabled={edit}
              fullWidth
            >
              <MenuItem value=""></MenuItem>

              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="outro">Outro</MenuItem>
              <MenuItem value="nao_informado">Prefiro não informar</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          required
          fullWidth
          label="Empresa"
          name="empresa"
          value={userEdit.empresa}
          onChange={handleChange}
          margin="normal"
          disabled={edit}
        />
        <Divider sx={{ my: 3 }} />
        {!edit ? (
          <>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Salvar
            </Button>
            <Button
              sx={{ marginTop: "15px" }}
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => setOpen(true)}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setEdit(false)}
          >
            Editar dados
          </Button>
        )}
      </Box>
      {open && (
        <ModalConfirmacao
          open={open}
          onClose={handleCloseModal}
          titulo="Tem certeza que deseja cancelar o cadastro?"
          onClickSim={() => {
            setUserEdit(user.profile);
            setEdit(true);
            handleCloseModal();
          }}
        />
      )}
    </form>
  );
}
