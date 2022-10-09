import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


export const userRegister = createAsyncThunk("auth/userRegister",async({formValue,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.userRegister(formValue);
        console.log("response",response.data.message);
        if(response.data.message){
            return toast.error(response.data.message);
        }
        toast.success("User registered successfully");
        navigate("/");
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

export const userLogin = createAsyncThunk("auth/userLogin",async({formValue,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.userLogin(formValue);
        if(response.data.message){
            return toast.error(response.data.message);
        }
        toast.success("User logged in successfully");
        navigate("/createorder");
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:true,
        error:"",
        isToggle:false,
        isAuthPage:true
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setLogout:(state)=>{
            localStorage.clear();
            state.user = null;
        },
        toggleConfirmCard:(state)=>{
            state.isToggle = !state.isToggle;
        },
        handleAuthPage:(state,action)=>{
            state.isAuthPage = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userRegister.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(userRegister.fulfilled,(state,action)=>{
            state.loading=false;
            state.user = action.payload;
            state.error="";
        })
        builder.addCase(userRegister.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(userLogin.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.loading=false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload;
            state.error="";
        })
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const {setUser,setLogout,toggleConfirmCard,handleAuthPage} = authSlice.actions;
export default authSlice.reducer;