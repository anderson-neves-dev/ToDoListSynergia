import React, { useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";

interface UploadProfilePictureProps {
  initialImage?: string;
  onImageChange: (imageBase64: string | null) => void;
  disabled?: boolean;
  width?: string;
  height?: string;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  initialImage = null,
  onImageChange,
  disabled = false,
  height = "150px",
  width = "150px",
}) => {
  const [imageBase64, setImageBase64] = useState<string | null>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // Função para Converter a imagem para Base64 e atualiza o estado
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box textAlign="center">
      <Box
        component="div"
        onClick={handleIconClick}
        sx={{
          width: { width },
          height: { height },
          borderRadius: "50%",
          overflow: "hidden",
          cursor: disabled ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          transition: "0.3s ease-in-out",
          position: "relative",
          "&:hover": disabled
            ? {}
            : {
                backgroundColor: "#e0e0e0",
                transform: "scale(1.05)",
              },
        }}
      >
        {imageBase64 ? (
          <img
            src={imageBase64}
            alt="Perfil"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <AccountCircleIcon sx={{ fontSize: "100px", color: "#888" }} />
        )}

        {/* Mostra um efeito visual se a alteração estiver ativada */}
        {!disabled && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              fontSize: "12px",
              textAlign: "center",
              padding: "4px 0",
            }}
          >
            Alterar foto
          </Box>
        )}
      </Box>

      {/* Input oculto para upload */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
      />
    </Box>
  );
};

export default UploadProfilePicture;
