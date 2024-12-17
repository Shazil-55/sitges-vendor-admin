import Typography from "@mui/material/Typography";
import { Link, useSearchParams } from "react-router-dom";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CardContent from "@mui/material/CardContent";
import _ from "@lodash";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { END_POINT } from "src/helpers/constants";

export enum VendorCategory {
  Services = "Services",
  Products = "Products",
  Restoration = "Restoration",
  Rental = "Rental",
}

const SignUpForm = () => {
  const [params] = useSearchParams();
  const [IsLoading, setIsLoading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState<string>("");
  const [SuccessMsg, setSuccessMsg] = useState<string>("");
  const [CompanyName, setCompanyName] = useState<string>("");
  const [CommercialName, setCommercialName] = useState<string>("");
  const [NifNumber, setNifNumber] = useState<string>("");
  const [Address, setAddress] = useState<string>("");
  const [Category, setCategory] = useState<string>("");
  const [CommercialInvoice, setCommercialInvoice] = useState<string>("");
  const [OwnerFirstName, setOwnerFirstName] = useState<string>("");
  const [OwnerLastName, setOwnerLastName] = useState<string>("");
  const [OwnerPhoneNo, setOwnerPhoneNo] = useState<string>("");
  const [RegisteredAs, setRegisteredAs] = useState<string>("");
  const [PreferedLanguage, setPreferedLanguage] = useState<string>("");

  async function submitForm() {
    try {
      setIsLoading(true);
      setErrorMsg("");

      if (
        !CompanyName ||
        !CommercialName ||
        !NifNumber ||
        !Address ||
        !Category ||
        !CommercialInvoice ||
        !OwnerFirstName ||
        !OwnerLastName ||
        !OwnerPhoneNo ||
        !RegisteredAs ||
        !PreferedLanguage
      ) {
        throw "Please fill all the fields";
      }

      const body = {
        companyName: CommercialName,
        commercialName: CommercialName,
        nifNumber: NifNumber,
        additionalAddress: Address,
        category: Category,
        commercialInvoice: CommercialInvoice === "Yes" ? true : false,
        ownerFirstName: OwnerFirstName,
        ownerLastName: OwnerLastName,
        ownerPhoneNo: OwnerPhoneNo,
        registeredAs: RegisteredAs,
        preferedLanguage: PreferedLanguage,
        userId: params.get("customerId"),
      };

      const res = await axios.post(
        END_POINT + "/auth/switch-profile/vendor",
        body,
      );

      setSuccessMsg(
        "Your request to become a vendor has been sent, we will get back to you soon.",
      );
      setIsLoading(false);
      setErrorMsg("");
      setCompanyName("");
      setCommercialName("");
      setNifNumber("");
      setAddress("");
      setCategory("");
      setCommercialInvoice("");
      setOwnerFirstName("");
      setOwnerLastName("");
      setOwnerPhoneNo("");
      setRegisteredAs("");
      setPreferedLanguage("");
    } catch (error) {
      if (typeof error === "string") {
        setErrorMsg(error);
      } else {
        setErrorMsg(
          error?.response?.data?.error ||
            "Something went wrong, please try again later.",
        );
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <TextField
        required
        variant="outlined"
        color="primary"
        label="Company Name"
        style={{ marginTop: "20px", marginBottom: "10px", width: "100%" }}
        value={CompanyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <TextField
        required
        variant="outlined"
        color="primary"
        label="commercial Name"
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
        value={CommercialName}
        onChange={(e) => setCommercialName(e.target.value)}
      />
      <TextField
        required
        variant="outlined"
        color="primary"
        label="NIF Number"
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
        value={NifNumber}
        onChange={(e) => setNifNumber(e.target.value)}
      />
      <TextField
        required
        variant="outlined"
        color="primary"
        multiline
        rows={4}
        label="Address"
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
        value={Address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <FormControl
        required
        fullWidth
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          required
          labelId="category-label"
          label="Category"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={"Services"}>Services</MenuItem>
          <MenuItem value={"Products"}>Products</MenuItem>
          <MenuItem value={"Restoration"}>Restoration</MenuItem>
          <MenuItem value={"Rental"}>Rental</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        required
        fullWidth
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
      >
        <InputLabel id="commercialInvoice-label">Commercial Invoice</InputLabel>
        <Select
          labelId="commercialInvoice-label"
          label="Commercial Invoice"
          value={CommercialInvoice}
          onChange={(e) => setCommercialInvoice(e.target.value)}
        >
          <MenuItem value={"Yes"}>Yes</MenuItem>
          <MenuItem value={"No"}>No</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        variant="outlined"
        color="primary"
        label="Owner First Name"
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
        value={OwnerFirstName}
        onChange={(e) => setOwnerFirstName(e.target.value)}
      />
      <TextField
        required
        variant="outlined"
        color="primary"
        label="owner Last Name"
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
        value={OwnerLastName}
        onChange={(e) => setOwnerLastName(e.target.value)}
      />
      <TextField
        required
        variant="outlined"
        color="primary"
        label="owner Phone No"
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
        value={OwnerPhoneNo}
        onChange={(e) => setOwnerPhoneNo(e.target.value)}
      />
      <FormControl
        required
        fullWidth
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
      >
        <InputLabel id="registered-label">Registered As</InputLabel>
        <Select
          labelId="registered-label"
          label="Registered As"
          value={RegisteredAs}
          onChange={(e) => setRegisteredAs(e.target.value)}
        >
          <MenuItem value={"Self-employed"}>Self Employed</MenuItem>
          <MenuItem value={"Others"}>Others</MenuItem>
          <MenuItem value={"Others"}>Others</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        required
        fullWidth
        style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
      >
        <InputLabel id="prefered-language-label">Prefered Language</InputLabel>
        <Select
          labelId="prefered-language-label"
          label="Prefered Language"
          value={PreferedLanguage}
          onChange={(e) => setPreferedLanguage(e.target.value)}
        >
          <MenuItem value={"English"}>English</MenuItem>
          <MenuItem value={"Spanish"}>Española</MenuItem>
        </Select>
      </FormControl>
      {ErrorMsg && <Alert severity="error">{ErrorMsg}</Alert>}
      {SuccessMsg && <Alert severity="success">{SuccessMsg}</Alert>}
      {IsLoading ? (
        <div
          className="flex justify-center"
          style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
        >
          <CircularProgress />{" "}
        </div>
      ) : (
        <Button
          onClick={() => {
            submitForm();
          }}
          style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      )}
    </>
  );
};

function SignUpPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Box
        className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
        sx={{ backgroundColor: "primary.main" }}
      >
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "primary.light" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -right-64 -top-64 opacity-20"
          sx={{ color: "primary.light" }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="text-3xl font-bold leading-none text-gray-100 flex items-center">
            <div>Become a vendor today at</div>
            <img
              className="h-52 mb-10 mt-10 ml-10"
              src="assets/images/logo/logo.svg"
              alt="logo"
            />
          </div>
          <div className="mt-24 text-lg leading-6 tracking-tight text-gray-400">
            Discover the future of convenience with Sitges.app—where innovation
            meets services for effortless living, redefining your lifestyle.
          </div>
        </div>
      </Box>
      <Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-center md:rounded-none md:p-64 md:shadow-none">
        <CardContent className="mx-auto w-full md:max-w-640 max-w-300 sm:mx-0 sm:w-640">
          <img
            className="h-64 bg-black p-10"
            src="assets/images/logo/logoDark.svg"
            alt="logo"
          />

          <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
            Sign up as a vendor
          </Typography>
          <SignUpForm />
        </CardContent>
      </Paper>
    </div>
  );
}

export default SignUpPage;
