import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://doc-q-book.vercel.app/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: ({page = 1,searchName = '',selectSpeciality = []}) => {
        let userDocUrl = `/doctors?page=${page}`
        if(searchName){
          userDocUrl += `?&name=${searchName}`
        }
        if(selectSpeciality){
          userDocUrl += `&specialties=${selectSpeciality}`
        }
        console.log(userDocUrl)
        return userDocUrl;
      },
    }), 
    getPayment : builder.query({
      query : () => `/transactions`
    }),
    getApppointments: builder.query({
      query : (page = 1) => `/appointments?page=${page}`
    }),
    cancelAppointment: builder.mutation({
      query : (id) => ({
        url : `/appointments/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Appointments']
    }),
    // UserProfile
    getUserData : builder.query({
      query : () => '/view-profile',
      providesTags : ['update-profile']
    }),
    // userUpdateProfile
    updateProfile : builder.mutation({
      query : (formData) => ({
        url : '/update-profile',
        body : formData,
        method : 'POST'
      }),
      invalidatesTags : ['update-profile']
    }),
    // Admin DashBoard
    getAdminDashBoard : builder.query({
      query : () => '/dashboard'
    }),
    // Admin Appointments
    getAllAdminAppointments : builder.query({
      query : (page = 1) => `/appointments?page=${page}`
    }), 
    getAdminDoctor : builder.query({
      query : ({page = 1,specialty = '',gender = [],sortBy = '',searchName = ''}) => {
        let adminUrl = `/doctors?page=${page}`;
        if(searchName){
          adminUrl += `&name=${searchName}`;
        }
        if(specialty.length > 0){
          adminUrl += `&specialties=${specialty}`;
        }
        if(gender.length > 0){
          adminUrl += `&gender=${gender}`;
        }
        if (sortBy.length > 0) {
          adminUrl += `&sort_by=${sortBy}`; 
        }
        console.log("Admin Doctor Url", adminUrl) 
        return adminUrl;
      }
    }),
    getAllDoctors: builder.query({
      query: (page = 1) => `/doctors?page=${page}`,
    }), 
    getAdminAppointment : builder.query({
      query: ({doctorIds = [],patientIds = [],page = 1}) => {
        let url = `/appointments?page=${page}`;
        if (doctorIds.length > 0) {
          url += `&doctorId=${doctorIds.join(',')}`;
        }

        if (patientIds.length > 0) {
          url += `&patientId=${patientIds.join(',')}`;
        }
        console.log("Final API URL:", url);
        return url;
      },
      providesTags: ['Appointments'],
    }),
    // Admin Add Doctor
    addDoctor : builder.mutation({
      query : (form) => ({
        url : '/doctors',
        method : 'POST',
        body : form
      })
    }),
    // Admin Patients
    getAllAdminPatients : builder.query({
      query : (page = 1) => `/patients?page=${page}`
    }),
    getAdminPatients : builder.query({
      query : ({page = 1,sortBy = '',searchName = '',patientGender = ''}) => {
        let adminPatinetUrl = `/patients?page=${page}`;
        if(sortBy){
          adminPatinetUrl += `&sort_by=${sortBy}`
        }
        if(searchName){
          adminPatinetUrl += `&name=${searchName}`
        }
        if(patientGender){
          adminPatinetUrl += `&gender=${patientGender}`
        }
        console.log(adminPatinetUrl)
        return adminPatinetUrl
      }
    }),
  }),
});

export const { useGetDoctorsQuery,
  useGetPaymentQuery,
  useGetAllAdminAppointmentsQuery,
  useGetApppointmentsQuery,
  useCancelAppointmentMutation,
  useGetUserDataQuery,
  useUpdateProfileMutation,
  useGetAdminDashBoardQuery,
  useGetAdminAppointmentQuery,
  useAddDoctorMutation,
  useGetAdminPatientsQuery,
  useGetAllAdminPatientsQuery,
  useGetAllDoctorsQuery,
  useGetAdminDoctorQuery
} = doctorApi;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://doc-q-book.vercel.app/api/auth/login', userData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      localStorage.clear()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.role = action.payload.user.role
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem(action.payload.user.role, 'true')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

