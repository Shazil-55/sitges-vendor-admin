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
  getVendorUsersAction,
  selectVendors,
  deleteVendorAction,
  updateOldVendorAction,
  // VendorUsers,
  // saveNewVendorAction,
  setVendors,
  saveNewVendorAction,
} from "app/store/vendorSlice";
import {
  UpdateVendorUsers,
  Vendors,
  ProfileStatus,
} from "../../../helpers/entities";
import { FormControl } from "@mui/base";
import {
  CategoryVendor,
  EMAIL_REGEX,
  LanguageMenuItems,
  PASSWORD_REGEX,
  CountryCode,
  StatusItems,
  YesNoMenuItems,
} from "src/helpers/constants";
import { string } from "zod";
import ViewDetails from "src/helpers/ViewDetails";
import FilterForm from "src/helpers/FilterForm";
import StatusSelect from "src/helpers/StatusSelect";
import InputField from "src/helpers/InputField";
import MultiField from "src/helpers/MultiField";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

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

function VendorUsers() {
  const { IsMob, IsTab, IsWeb } = useDevice();
  const dispatch = useAppDispatch();
  const [IsAddVendorDialogOpen, setIsAddVendorDialogOpen] = useState(false);
  const [IsEditVendorDialogOpen, setIsEditVendorDialogOpen] = useState(false);
  const [IsLoadingData, setIsLoadingData] = useState(true);
  const [IsVendorDialogOpen, setIsVendorDialogOpen] = useState(true);

  const [VendorBeingViewed, setVendorBeingViewed] = useState<null | string>(
    null,
  );
  const [VendorBeingDeletedId, setVendorBeingDeletedId] = useState<
    null | string
  >(null);
  const [VendorBeingUpdatedId, setVendorBeingUpdatedId] = useState<
    null | string
  >(null);

  let vendorUsersData = useSelector(selectVendors);

  const [Id, setId] = useState("");
  const [DispatcherEmail, setDispatcherEmail] = useState("");
  const [DispatcherName, setDispatcherName] = useState("");
  const [FilterStatus, setFilterStatus] = useState("");
  const [CompanyName, setCompanyName] = useState(null);
  const [CommercialName, setCommercialName] = useState(null);
  const [NifNumber, setNifNumber] = useState(null);
  const [AdditionalAddress, setAdditionalAddress] = useState(null);
  const [Category, setCategory] = useState(null);
  const [CommercialInvoice, setCommercialInvoice] = useState(null);
  const [OwnerFirstName, setOwnerFirstName] = useState(null);
  const [OwnerLastName, setOwnerLastName] = useState(null);
  const [PreferedLanguage, setPreferedLanguage] = useState(null);
  const [OwnerPhoneNo, setOwnerPhoneNo] = useState(null);
  const [Status, setStatus] = useState(null);
  const [Dispatcher, setDispatcher] = useState(null);
  const [SelectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [Email, setEmail] = useState(null);
  const [FirstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [PhoneNo, setPhoneNo] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [IsLoadingDialog, setIsLoadingDialog] = useState(false);
  const [postCode, setPostCode] = useState("");
  const [FilteredData, setFilteredData] = useState<any>(vendorUsersData);
  const [IsEditing, setIsEditing] = useState(false);
  const [IsView, setIsView] = useState(false);

  const [VendorBeingEditedId, setVendorBeingEditedId] = useState<null | string>(
    null,
  );




  const [FilterName, setFilterName] = useState("");
  const [FilterEmail, setFilterEmail] = useState("");
  const [commercialActivity, setCommercialActivity] = useState("");
  const [registeredAs, setRegisteredAs] = useState(null);

  const [emailAccounting, setEmailAccounting] = useState(null);
  const [countryCode, setCountryCode] = useState("")
  const [block, setBlock] = useState("")
  const [town, setTown] = useState("")
  const [street, setStreet] = useState("")
  const [floor, setFloor] = useState("")
  const [stair, setStair] = useState("")
  const [door, setDoor] = useState("")


  const [ProfileImage, setProfileImage] = useState<string | File>()

  const newImageStyle = {
    marginTop: "15px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "start",
    justifyContent: "end",
    width: IsEditing ? "40%" : "48%",
    height: "200px",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    border: "1px dotted black",
  };
  const new2ImageStyle = {
    display: "flex",
    alignItems: "start",
    justifyContent: "end",
    width: "100%",
    height: "200px",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "1px dotted black",
  };



  useEffect(() => {
    getVendors();
  }, []);

  useEffect(() => {
    setFilteredData(vendorUsersData);
  }, [vendorUsersData]);

  useEffect(() => {
    let vendor = vendorUsersData;
    if (vendorUsersData) {
      setId(vendor.id)
      setFirstName(vendor.firstName);
      setLastName(vendor.lastName);
      setEmail(vendor.email);
      setEmailAccounting(vendor.emailAccounting)
      setBlock(vendor.block)
      setDoor(vendor.door);
      setStair(vendor.stair);
      setFloor(vendor.floor);
      setStreet(vendor.street)
      setPostCode(vendor.postCode);
      setTown(vendor.town);
      setProfileImage(vendor.profileImage);
      setOwnerPhoneNo(vendor.phoneNo);
      setCompanyName(vendor.companyName);
      setCountryCode(vendor.countryCode);
      setCommercialName(vendor.commercialName);
      setCommercialActivity(vendor.commercialActivity);
      setNifNumber(vendor.nifNumber);
      setAdditionalAddress(vendor.fiscalAddress);
      setCategory(vendor.category);
      setRegisteredAs(vendor.registeredAs);


    }
  }, [vendorUsersData]);

  const DefaultValues = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setBlock("");
    setStreet("");
    setDoor("");
    setStair("");
    setFloor("");
    setPostCode("");
    setProfileImage("");
    setPhoneNo("");
    setCountryCode("");
    setCompanyName("");
    setCommercialName("");
    setCommercialActivity("");
    setNifNumber("");
    setAdditionalAddress("");
    setCategory("");
    setOwnerFirstName("");
    setOwnerLastName("");
    setRegisteredAs("");
    setOwnerPhoneNo("");
    setDispatcher("");
    setVendorBeingEditedId("");
    setVendorBeingViewed("");
    setIsEditing(false);
  };



  useEffect(() => {
    if (!IsVendorDialogOpen) {
      DefaultValues();
    }
  }, [IsVendorDialogOpen]);

  async function initEdit(id: string) {
    setIsEditVendorDialogOpen(true);
    setVendorBeingEditedId(id);
    setIsAddVendorDialogOpen(true);
    setIsEditing(true);
  }

  async function initView(id: string) {
    setIsVendorDialogOpen(true);
    setVendorBeingViewed(id);
  }

  async function getVendors() {
    setIsLoadingData(true);
    await dispatch(getVendorUsersAction());
    setIsLoadingData(false);
  }

  const handleCustomerChange = (_, newValue) => {
    setSelectedCustomer(newValue);
  };

  async function deleteVendor(id: string) {
    setVendorBeingDeletedId(id);
    await dispatch(deleteVendorAction(id));
    await dispatch(getVendorUsersAction());
    setVendorBeingDeletedId(null);
  }


  async function updateVendor() {
    try {
      if (
        !ProfileImage ||
        !CompanyName ||
        !countryCode ||
        !CommercialName ||
        !Email ||
        !floor ||
        !door ||
        !stair ||
        !postCode ||
        !street ||
        !block ||
        !town ||
        !commercialActivity ||
        !NifNumber ||
        !Category ||
        !registeredAs ||
        !AdditionalAddress ||
        !OwnerPhoneNo
      )
        throw "Please fill all the required fields";

      setErrorMsg("");
      setIsLoadingDialog(true);

      const body: UpdateVendorUsers = {
        commercialName: CommercialName,
        emailAccounting: Email,
        block: block,
        postCode: postCode,
        floor: floor,
        door: door,
        stair: stair,
        town: town,
        street: street,
        commercialActivity: commercialActivity,
        countryCode: countryCode,
        nifNumber: NifNumber,
        fiscalAddress: AdditionalAddress,
        category: Category,
        profileImage: ProfileImage,
        registeredAs: registeredAs,
        phoneNo: OwnerPhoneNo,

        // status: Status,
      };

      const response = await dispatch(
        updateOldVendorAction(body),
      );
      if (response !== ("Updated successfully" as any)) throw response;
      await dispatch(getVendorUsersAction());
      setIsLoadingDialog(false);
      setIsAddVendorDialogOpen(false);
      setIsEditVendorDialogOpen(false);
      setIsEditing(false);
      setIsView(false);
      dispatch(
        showMessage({
          message: "Vendor updated successfully!", //text or html
          autoHideDuration: 6000, //ms
          anchorOrigin: {
            vertical: "top", //top bottom
            horizontal: "right", //left center right
          },
          variant: "success", //success error info warning null
        }),
      );
    } catch (error) {
      setErrorMsg(error);
      setIsLoadingDialog(false);
    }
  }

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Open WhatsApp in a new tab
    window.open('https://wa.me/923341481008', '_blank');
  };

  return (
    <Root
      header={
        <div className="p-24">
          <h1>Your Vendor profile</h1>
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
            <EditIcon /> Edit  Profile
          </Button>


          <h1 style={{ marginTop: "50px", marginBottom: "10px" }}>
            Your Profile :
          </h1>

          {IsEditing && (
            <DialogWrapper
              isOpen={IsEditing}
              onClose={() => setIsEditing(false)}
              title={"Update Profile"}
              maxWidth="lg"
              errorMsg={ErrorMsg}
              isLoadingActions={IsLoadingDialog}
              onSave={() => {
                updateVendor();
              }}
              saveButtonText={"Update"}
              content={
                <div
                  style={{
                    width: IsWeb ? "1000px" : "",
                    height: IsWeb ? "75vh" : "",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* profile Image */}
                    <input
                      accept="image/*"
                      id="files-uploader-v1"
                      multiple
                      hidden
                      type="file"
                      onChange={(e) => {
                        if (!e.target.files || e.target.files.length === 0)
                          return;
                        setProfileImage(e.target.files[0]);
                      }}
                    />
                    <div
                      onClick={() => {
                        document.getElementById("files-uploader-v1").click();
                      }}
                      style={{
                        marginTop: "15px",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48%",
                        height: "200px",
                        border: "1px dotted black",
                        background: "#eee",
                        cursor: "pointer",
                      }}
                    >
                      <h3
                        style={{
                          color: "grey",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FuseSvgIcon className="text-48 mr-10" size={24}>
                          heroicons-solid:cloud-upload
                        </FuseSvgIcon>
                        Upload Profile image
                      </h3>
                    </div>

                    {ProfileImage ? (
                      <div style={{ ...newImageStyle }}>
                        {ProfileImage instanceof File ? (
                          <div
                            style={{
                              ...new2ImageStyle,
                              backgroundImage:
                                ProfileImage instanceof File
                                  ? `url(${URL.createObjectURL(ProfileImage)})`
                                  : ProfileImage,
                            }}
                          ></div>
                        ) : (
                          <img
                            style={{ width: "100%", height: "200px" }}
                            src={ProfileImage}
                            alt="Image"
                          />
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* <InputField
                    label="Owner First Name*"
                    value={OwnerFirstName}
                    onChange={setOwnerFirstName}
                    type="text"
                  />
                  <InputField
                    label="Owner Last Name*"
                    value={OwnerLastName}
                    onChange={setOwnerLastName}
                    type="text"
                  /> */}


                    <InputField
                      label="Company Name*"
                      value={CompanyName}
                      onChange={setCompanyName}
                      type="text"
                    />
                    <InputField
                      label="Commercial Name*"
                      value={CommercialName}
                      onChange={setCommercialName}
                      type="text"
                    />
                    <InputField
                      label="NIF Number*"
                      value={NifNumber}
                      onChange={setNifNumber}
                      type="text"
                    />
                    <InputField
                      label="Commercial Activity*"
                      value={commercialActivity}
                      onChange={setCommercialActivity}
                      type="text"
                    />
                    <InputField
                      label="Owner Phone Number*"
                      value={OwnerPhoneNo}
                      onChange={setOwnerPhoneNo}
                      type="number"
                    />

                    <InputField
                      label="Email Accounting*"
                      value={emailAccounting}
                      onChange={setEmailAccounting}
                      type="email"
                    />
                    <InputField
                      label="Block*"
                      value={block}
                      onChange={setBlock}
                      type="text"
                    />
                    <InputField
                      label="Town*"
                      value={town}
                      onChange={setTown}
                      type="text"
                    />
                    <InputField
                      label="Street*"
                      value={street}
                      onChange={setStreet}
                      type="number"
                    />
                    <InputField
                      label="Post Code*"
                      value={postCode}
                      onChange={setPostCode}
                      type="number"
                    />
                    <InputField
                      label="Stair*"
                      value={stair}
                      onChange={setStair}
                      type="text"
                    />
                    <InputField
                      label="Floor*"
                      value={floor}
                      onChange={setFloor}
                      type="number"
                    />
                    <InputField
                      label="Door*"
                      value={door}
                      onChange={setDoor}
                      type="number"
                    />

                    <StatusSelect
                      label="Country Code*"
                      value={countryCode}
                      onChange={setCountryCode}
                      menuItems={CountryCode}
                    ></StatusSelect>


                    <MultiField
                      label="Additional Address"
                      value={AdditionalAddress}
                      onChange={setAdditionalAddress}
                    />

                    <StatusSelect
                      label="Category*"
                      value={Category}
                      onChange={setCategory}
                      menuItems={CategoryVendor}
                    ></StatusSelect>

                    {/* <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={customers}
                      getOptionLabel={(customer) => customer.email}
                      value={SelectedCustomer}
                      onChange={handleCustomerChange}
                      sx={{ width: "100%", margin: "30px 0px" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Vendors User Profile is"
                        />
                      )}
                    /> */}
                    <FormControl
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        marginBottom: "10px",
                      }}
                    >
                      <InputLabel>Rejistered As*</InputLabel>
                      <Select
                        value={registeredAs}
                        onChange={(e) => setRegisteredAs(e.target.value)}
                        label="Is Active"
                        style={{ width: "100%" }}
                      >
                        <MenuItem value={"Self-employed"}>
                          Self-employed
                        </MenuItem>
                        <MenuItem value={"Society"}>Society</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              }
            />
          )}


          {/* <div
                  style={{
                    width: IsWeb ? "1000px" : "",
                    height: IsWeb ? "75vh" : "",
                  }}
                > */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginLeft: "20px"
            }}
          >
            <div className="w-full">

              {ProfileImage ? (
                <div style={{ ...newImageStyle }}>
                  {ProfileImage instanceof File ? (
                    <div
                      style={{
                        ...new2ImageStyle,
                        backgroundImage:
                          ProfileImage instanceof File
                            ? `url(${URL.createObjectURL(ProfileImage)})`
                            : ProfileImage,
                      }}
                    ></div>
                  ) : (
                    <img
                      src={ProfileImage}
                      className="w-full h-[200px]"
                      alt="Image"
                    />
                  )}
                </div>
              ) : null}
            </div>
            <ViewDetails
              heading="Name"
              value={`${FirstName} ${LastName}`}
            />

            <ViewDetails heading="Company Name" value={CompanyName} />
            <ViewDetails
              heading="Commercial Name"
              value={CommercialName}
            />
            <ViewDetails heading="NIF Number" value={NifNumber} />
            <ViewDetails heading="Commercial Activity" value={commercialActivity} />
            <ViewDetails heading="Phone Number" value={OwnerPhoneNo} />

            <ViewDetails heading="Country Code" value={countryCode} />
            <ViewDetails
              heading="Post Code"
              value={postCode}
            />
            <ViewDetails heading="Email" value={emailAccounting} />

            <ViewDetails heading="Block" value={block} />
            <ViewDetails
              heading="Town"
              value={town}
            />

            <ViewDetails
              heading="Street"
              value={street}
            />
            <ViewDetails
              heading="Stair"
              value={stair}
            />
            <ViewDetails
              heading="Floor"
              value={floor}
            />
            {/* <ViewDetails heading="User Email" value={email} /> */}
            <ViewDetails
              heading="Door"
              value={door}
            />
            <ViewDetails heading="Category" value={Category} />
            <ViewDetails
              heading="Additional Address"
              value={AdditionalAddress}
            />
            <ViewDetails heading="User Profile" value={Email} />

            <ViewDetails heading="Registered As" value={registeredAs} />

          </div>
          {/* </div> */}

        </div>
      }
    />
  );
}

export default VendorUsers;
