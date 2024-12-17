import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootStateType } from "app/store/types";
import axios, { AxiosError } from "axios";
import { END_POINT } from "src/helpers/constants";
import { Wallet } from "src/helpers/entities";

type WalletState = {
  wallet: Wallet;
};

export const walletslice = createSlice({
  name: "wallet",
  initialState: {
    wallet: {},
  } as WalletState,
  reducers: {
    setWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallet = action.payload;
    },
  },
});

export type walletsliceType = typeof walletslice;

type AppRootStateType = RootStateType<[walletsliceType]>;

export const { setWallet } = walletslice.actions;

export const getWalletAction =
  (): AppThunk<Promise<string>> => async (dispatch) => {
    try {
      const res = await axios.get<{ data: Wallet }>(
        `${END_POINT}/user/wallet/`,
        {
          headers: {
            "access-token": localStorage.getItem("jwt_access_token"),
          },
        },
      );

      dispatch(setWallet(res.data.data));
      return "Wallet get successfully";
    } catch (error) {
      if (error && (error as AxiosError).response) {
        return (error.response.data.error as string) || "Error Getting  Wallet";
      }
      return "Error Getting Wallet";
    }
  };

// export const saveNewWalletAction =
//   (body: Partial<Wallet>): AppThunk<Promise<string>> =>
//   async () => {
//     try {
//       await axios.post(`${END_POINT}/admin/wallet`, body, {
//         headers: {
//           "access-token": localStorage.getItem("jwt_access_token"),
//         },
//       });

//       return "Wallet added successfully";
//     } catch (error) {
//       if (error && (error as AxiosError).response) {
//         return (error.response.data.error as string) || "Error Adding Wallet";
//       }
//       return "Error Adding Wallet";
//     }
//   };

// export const updateOldWalletAction =
//   ( body: Partial<UpdateWalletUsers>): AppThunk<Promise<string>> =>
//   async () => {
//     try {
//       await axios.put(`${END_POINT}/wallet`, body, {
//         headers: {
//           "access-token": localStorage.getItem("jwt_access_token"),
//         },
//       });
//       return "Updated successfully";
//     } catch (error) {
//       if (error && (error as AxiosError).response) {
//         return (error.response.data.error as string) || "Error Updating Wallet";
//       }
//       return "Error Updating Wallet";
//     }
//   };

// export const deleteWalletAction =
//   (id: string): AppThunk<Promise<string>> =>
//   async () => {
//     try {
//       await axios.delete(`${END_POINT}/admin/wallets/${id}`, {
//         headers: {
//           "access-token": localStorage.getItem("jwt_access_token"),
//         },
//       });
//       return "Deleted wallet";
//     } catch (error) {
//       if (error && (error as AxiosError).response) {
//         return (error.response.data.error as string) || "Error Deleting Wallet";
//       }
//       return "Error Deleting Wallet";
//     }
//   };

export const selectWallet = (state: AppRootStateType) => state.wallet.wallet;

export default walletslice.reducer;
