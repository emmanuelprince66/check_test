import React from "react";
import { Modal } from "@mui/material";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

import { useTheme } from "@mui/material";
import {
  Card,
  Box,
  Container,
  Typography,
  CircularProgress,
  modalClasses,
} from "@mui/material";
import { Divider, Button } from "@mui/material";

const SharedReceipt = ({
  handleSharedModal,
  setHandleSharedModal,
  pdfBlob,
}) => {
  const currentTheme = useTheme();
  const handleClose = () => setHandleSharedModal(false);
  console.log(pdfBlob);

  //   const FaceBookIcon = generateShareIcon("facebook");
  //   const Whatsapp = generateShareIcon("whatsapp");
  const shareUrl = "http://github.com";
  const title = "GitHub";
  return (
    <>
      <Modal
        classetsName="scale-in-center"
        open={handleSharedModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            bottom: 0,
            width: { xs: "100%", sm: "70%", lg: "31%" },
            left: { xs: "0", sm: "14%", lg: "34%" },
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              padding: "1rem",
            }}
          >
            <FacebookMessengerShareButton  url={URL.createObjectURL(pdfBlob)}>
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>

            <WhatsappShareButton>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <TelegramShareButton>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default SharedReceipt;
