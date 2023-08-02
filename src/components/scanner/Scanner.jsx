import React from "react";
import QrReader from "react-qr-scanner";
import { Box } from "@mui/material";
import useSuperMarketP from "../../hooks/useSuperMarketP";
import { Modal, Button, Card, Typography } from "@mui/material";
import alwaysp from "../../images/alwaysp.svg";
import { useTheme } from "@mui/material";
import vcart from "../../images/practise/vcart.svg";
import { CircularProgress } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../util/slice/CartSlice";
import { useSelector } from "react-redux";
import Quagga from "@ericblade/quagga2";
import { useRef, useCallback, useState, useEffect } from "react";
import TestScanner from "../TestScanner";
const Scanner = ({ superMarketId }) => {
  const cart = useSelector((state) => state.cart);

  const [result, setResult] = useState("");
  const dispatch = useDispatch();

  // test states
  const [scanning, setScanning] = useState(true); // toggleable state for "should render scanner"
  const [cameras, setCameras] = useState([]); // array of available cameras, as returned by Quagga.CameraAccess.enumerateVideoDevices()
  const [cameraId, setCameraId] = useState(null); // id of the active camera device
  const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
  const [torchOn, setTorch] = useState(false); // toggleable state for "should torch be on"
  const scannerRef = useRef(null); // reference to the scanner element in the DOM
  const [showProgress, setShowProgress] = useState(false);

  // end test states

  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const superMarketP = useSuperMarketP(superMarketId, result ? result : "");

  const currentTheme = useTheme();
  const decrement = () => {
    if (count > 1 && count != 0) {
      setCount(count - 1);
    }
  };
  const handleModal = (res) => {
    setTimeout(() => {
      setShowProgress(false);
      setResult(res);
      setCount(1);
      setOpen(true);
    }, 3000);
    setShowProgress(true);
  };

  const defaultComputedPrice = !superMarketP.data?.price || !count ? 0 : null;
  const computedPrice = defaultComputedPrice
    ? defaultComputedPrice
    : superMarketP.data?.price * count;
  const defaultPrice =
    computedPrice && !defaultComputedPrice
      ? computedPrice
      : superMarketP.data?.price;

  const handleAddToCart = (data) => {
    const isValueInArray = cart.some((item) => item.id === data.id);

    if (isValueInArray) {
      notifyWarn("Item is already in cart");
      setOpen(false);
    } else {
      dispatch(addToCart({ ...data, price: defaultPrice, counter: count }));
      notify("Item added to cart");
      setOpen(false);
    }
  };

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const notifyWarn = (message) => {
    toast.warn(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  useEffect(() => {
    const enableCamera = async () => {
      await Quagga.CameraAccess.request(null, {});
    };
    const disableCamera = async () => {
      await Quagga.CameraAccess.release();
    };
    const enumerateCameras = async () => {
      const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
      console.log("Cameras Detected: ", cameras);
      return cameras;
    };
    enableCamera()
      .then(disableCamera)
      .then(enumerateCameras)
      .then((cameras) => setCameras(cameras))
      .then(() => Quagga.CameraAccess.disableTorch()) // disable torch at start, in case it was enabled before and we hot-reloaded
      .catch((err) => setCameraError(err));
    return () => disableCamera();
  }, []);

  // provide a function to toggle the torch/flashlight
  const onTorchClick = useCallback(() => {
    const torch = !torchOn;
    setTorch(torch);
    if (torch) {
      Quagga.CameraAccess.enableTorch();
    } else {
      Quagga.CameraAccess.disableTorch();
    }
  }, [torchOn, setTorch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* <Box>
        {cameras.length === 0 ? (
          <p>
            Enumerating Cameras, browser may be prompting for permissions
            beforehand
          </p>
        ) : (
          <form>
            <select onChange={(event) => setCameraId(event.target.value)}>
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || camera.deviceId}
                </option>
              ))}
            </select>
          </form>
        )}
      </Box> */}
      <Box>
        {/* <button onClick={onTorchClick}>
          {torchOn ? "Disable Torch" : "Enable Torch"}
        </button> */}
        {/* <button onClick={() => setScanning(!scanning)}>
          {scanning ? "Stop" : "Start"}
        </button> */}
      </Box>

      {showProgress ? (
        <CircularProgress
          size="3.5rem"
          sx={{
            marginTop: "3rem",
          }}
          color="error"
        />
      ) : (
        <Box
          sx={{
            maxHeight: "19rem",
            marginTop: "-4rem",
            padding: "0.5rem",
            borderRadius: "10px ",
            justifyContent: "start",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",

            maxWidth: { xs: "16rem", sm: "15rem", md: "15rem", lg: "15rem" },
          }}
          ref={scannerRef}
        ></Box>
      )}

      <Box sx={{}}>
        <Box>
          {scanning ? (
            <TestScanner
              scannerRef={scannerRef}
              cameraId={cameraId}
              onDetected={(res) => handleModal(res)}
            />
          ) : null}
        </Box>
      </Box>

      <Modal
        className="scale-in-center"
        open={open}
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
              textAlign: "center",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Box>
              <Box
                sx={{
                  maxWidth: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  padding: "1rem",
                  backgroundColor:
                    currentTheme.palette.type === "light"
                      ? "rgba(232, 229, 229, 1)"
                      : "rgba(232, 229, 229, 1)",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={
                    superMarketP.data ? (
                      superMarketP.data.productImage === null ? (
                        alwaysp
                      ) : (
                        superMarketP.data.productImage
                      )
                    ) : (
                      <CircularProgress size="10px" />
                    )
                  }
                  alt="always"
                />
              </Box>
            </Box>

            <Card
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                padding: "1rem 2rem",
                width: "335px",
                my: "0.5rem",
                background:
                  currentTheme.palette.type === "light" ? "#e8e5e5" : "#262626",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "3px",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontSize: "12px",
                    fontWeight: 900,
                  }}
                >
                  {superMarketP.data ? superMarketP.data.description : ""}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "raleWay",
                    fontSize: " 10px",
                    fontWeight: 400,
                  }}
                >
                  (size {superMarketP.data ? superMarketP.data.weight : ""})
                </Typography>
              </Box>
              {/* Counter */}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  onClick={decrement}
                  sx={{
                    background: "#eff0f9",
                    color:
                      currentTheme.palette.type === "light" ? "#000" : "#000",
                    fontWeight: "900",
                    padding: "0",
                    width: "2px",
                    paddingLeft: "1ch",
                  }}
                  i
                >
                  -
                  <Typography
                    sx={{
                      fontFamily: "raleWay",
                      color:
                        currentTheme.palette.type === "light" ? "#000" : "#000",
                      fomtWeight: "900",
                      mx: "2ch",
                    }}
                  >
                    {count}
                  </Typography>
                </Button>

                <Box
                  onClick={() => setCount(count + 1)}
                  sx={{
                    background: "#ff0808",
                    color:
                      currentTheme.palette.type === "light" ? "#fff" : "#fff",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    fontFamily: "raleWay",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "-10px",
                    zIndex: "1",
                  }}
                >
                  +
                </Box>
              </Box>

              {/* Counter ends */}
              <Typography
                sx={{
                  color: "#F79E1B",
                  fontFamily: "raleWay",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                &#8358;{superMarketP.data ? defaultPrice : ""}
              </Typography>
            </Card>

            <Button
              onClick={() =>
                handleAddToCart(superMarketP.data ? superMarketP.data : "")
              }
              sx={{
                height: "48px",
                background: "#F6473C",
                borderRadius: "8px",
                width: "333px",
                display: "flex",
                padding: "10px, 16px, 10px, 16px",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                flexGrow: "1",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F6473C", // Custom background color on hover
                },
                "&:active": {
                  backgroundColor: "#F6473C", // Custom background color on click
                },
              }}
            >
              <img src={vcart} alt="vcart" />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  fontFamily: "raleWay",
                  paddingTop: "7px",
                  textTransform: "capitalize",
                }}
              >
                Add to Cart
              </Typography>
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};

export default Scanner;
