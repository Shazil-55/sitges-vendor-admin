import DemoContent from "@fuse/core/DemoContent";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DialogWrapper } from "src/helpers/DialogWrapper";
import { tableCellClasses } from "@mui/material/TableCell";
import { MouseEventHandler, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store/store";
import { TableComp } from "app/shared-components/TableComp";
import {
  closeDialog,
  openDialog,
} from "@fuse/core/FuseDialog/store/fuseDialogSlice";
import { useDevice } from "src/helpers/useDevice";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import {
  getWalletAction,
  selectWallet,
  // deleteWalletAction,
  // updateOldWalletAction,
  // WalletUsers,
  // saveNewWalletAction,
  setWallet,
  // saveNewWalletAction,
} from "app/store/walletSlice";
import {
  // UpdateWalletUsers,
  Wallet,
  ProfileStatus,
} from "../../../helpers/entities";
import { FormControl } from "@mui/base";
import {
  // CategoryWallet,
  EMAIL_REGEX,
  LanguageMenuItems,
  PASSWORD_REGEX,
  StatusItems,
  YesNoMenuItems,
} from "src/helpers/constants";
import { string } from "zod";
import ViewDetails from "src/helpers/ViewDetails";
import FilterForm from "src/helpers/FilterForm";
import StatusSelect from "src/helpers/StatusSelect";
import InputField from "src/helpers/InputField";
import MultiField from "src/helpers/MultiField";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

function WalletUsers() {
  const { IsMob, IsTab, IsWeb } = useDevice();
  const dispatch = useAppDispatch();
  const [IsLoadingData, setIsLoadingData] = useState(true);
  const [IsWalletDialogOpen, setIsWalletDialogOpen] = useState(true);


  let walletUsersData = useSelector(selectWallet);

  const [Id, setId] = useState("");

  const [Cash, setCash] = useState(null);

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    let wallet = walletUsersData;
    if(walletUsersData)
    {
        setCash(wallet.cash)       
    }
  }, [ walletUsersData]);


  async function initEdit(id: string) {
    // setIsEditWalletDialogOpen(true);
    // setWalletBeingEditedId(id);
    // setIsAddWalletDialogOpen(true);
    // setIsEditing(true);
  }


  async function getWallet() {
    setIsLoadingData(true);
    await dispatch(getWalletAction());
    setIsLoadingData(false);
  }

  // async function updateWallet() {
  //   try {
  //     if (
  //       !CompanyName ||
  //       !CommercialName ||
  //       !NifNumber ||
  //       !Category ||
  //       !OwnerFirstName ||
  //       !OwnerLastName ||
  //       !RegisteredAs ||
  //       !PreferedLanguage ||
  //       !OwnerPhoneNo ||
  //       !Status
  //     )
  //       throw "Please fill all the required fields";

  //     setErrorMsg("");
  //     setIsLoadingDialog(true);

  //     const body: UpdateWalletUsers = {
  //       companyName: CompanyName,
  //       commercialName: CommercialName,
  //       nifNumber: NifNumber,
  //       additionalAddress: AdditionalAddress,
  //       category: Category,
  //       ownerFirstName: OwnerFirstName,
  //       ownerLastName: OwnerLastName,
  //       registeredAs: RegisteredAs,
  //       preferedLanguage: PreferedLanguage,
  //       ownerPhoneNo: OwnerPhoneNo,
  //       status: Status,
  //       // status: Status,
  //     };

  //     const response = await dispatch(
  //       updateOldWalletAction(body),
  //     );
  //     if (response !== ("Updated successfully" as any)) throw response;
  //     await dispatch(getWalletUsersAction());
  //     setIsLoadingDialog(false);
  //     setIsAddWalletDialogOpen(false);
  //     setIsEditWalletDialogOpen(false);
  //     setIsView(false);
  //     dispatch(
  //       showMessage({
  //         message: "Wallet updated successfully!", //text or html
  //         autoHideDuration: 6000, //ms
  //         anchorOrigin: {
  //           vertical: "top", //top bottom
  //           horizontal: "right", //left center right
  //         },
  //         variant: "success", //success error info warning null
  //       }),
  //     );
  //   } catch (error) {
  //     setErrorMsg(error);
  //     setIsLoadingDialog(false);
  //   }
  // }



  return (
    <Root
      header={
        <div className="p-24">
          <h1>Your Wallet </h1>
        </div>
      }
      content={
        <div className="p-24 w-full">
          <br />

          <Button
            variant="contained"
            className="mb-10"
            color="primary"
            onClick={() => {
              initEdit(Id)
            }}
          >
            <EditIcon /> Request Withdrawl
          </Button>


          <h1 style={{ marginTop: "50px", marginBottom: "10px" }}>
            Total Cash : ${Cash}
          </h1>

                {/* </div> */}
           
        </div>
      }
    />
  );
}

export default WalletUsers;
