# react-native-hotel-booking
React Hotel Booking React Native Project 

## Link to APK:
  [Downoad](https://drive.google.com/file/d/1a391Or78xqwekVebRH3rUkmjp9eIDJ9j/view?usp=sharing)


## Installation Guide

### Download apk file from above [Downoad](https://drive.google.com/file/d/1a391Or78xqwekVebRH3rUkmjp9eIDJ9j/view?usp=sharing) link ( section Link to APK ) on Android device with version 16 or above
  - **Open with Packege installer**
  - **Install**
  - **wait**
  - **if Google Play Protected recommended App scan recommended:**
    select More details and
    Install without scanning
  - **Open**

---
## Setup project Guide

### Prerequisites
- **Node.js** (v22 or higher)
- **Expo CLI** – Expo CLI is included in the expo package.
- **Android Emulator** (for Android) - come with Android studio
- **iOS Simulator** (for macOS) – Xcode required
- **.env file** – Create a `.env` file in the project root with your [backendless](https://backendless.com/) already created app configuratioins:
  ```
  EXPO_PUBLIC_API_URL=<your-api-url>
  EXPO_PUBLIC_APPLICATION_ID=<your-app-id>
  EXPO_PUBLIC_CLOUD_KEY=<your-cloud-key>

  EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_BASE_API_URL}/${EXPO_PUBLIC_APPLICATION_ID}/${EXPO_PUBLIC_CLOUD_KEY}/data

  EXPO_PUBLIC_API_URL_AUTH=<your-app-url>/api/users
  ```

**Tales at db models:**
```javascript
// hotels
{ "city":"string","occupancy":"string","kind":"string","created":"number","image_url":"string","description":"string","ownerId":null,"is_available":"boolean","country_code":"string","raiting":"number","price_per_night":"number","name":"string","location";"string","id":"number","category":"string","galery":"string" }

// bookings
{ "checkIn":"date","checkOut":"date","city":"string","country":"string","hotelId":"string","id":"string","imageUrl":"string","kind":"string","location":"string","name":"string","occupancy":"string","price":"number","resourceId":"number","state":"string","tag":"string","userId":"uuid"}
```

### Installation Steps

1. **Clone the repository:** 

      [Hotel booking](https://github.com/georgidokoff/react-native-hotel-booking.git)

2. **Install dependencies**

      ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo modules**

      ```bash
    yarn add expo
    ```

4. **Prebuild native modules** (Android/iOS):

   ```bash
   #You can use project script
    npm run prebuild --clean
   ```

### Running the Project:

#### Android
```bash
    # You can run development server
    npx expo start

    # You can run on emulator
    npx expo run:android

    # You can reate release file for Android device using project script
    npm run build:apk
```

#### iOS (macOS only)
```bash
    # You can run development server
    npx expo start

    # You can run on simulator
    npx expo run:ios
```

---

## Walkthrough Tutorial:

### Walkthrough for Guest User
1. Launch the app and select "Continue as Guest" on the "Let's you in" screen.
2. You will be directed to the Home screen where you can browse through featured and recommended hotels. Pull down to refresh the list if needed.
3. Tap on any hotel card to view its details, including the photo gallery, location, description, and price per night.
4. Navigate to the Search tab to search for hotels by name, city, country, or type. Note that as a guest, you can view the details, but button for booking is not avaiable. If there are no matches will appear  "No hotels found".
5. Notice that the Bookings tab is disabled since you are not logged in.
6. Go to the Profile tab to view static guest information. Tap the logout button in the header to return to the authentication screen.

### Walkthrough for Authenticated User (username and password are included in the example)
1. On the auth screen, choose to Sign with password.
2. Enter the email `pesho@a.bg` and password `123456`. Submit the form.
3. Upon successful login, you will land on the Home screen and see all available hotels.
4. Tap on a hotel card. You will now see a "Book Now" button on the details screen. Tap it to select check-in and check-out dates, check the calculated price, and complete a booking.
5. Go to the Search tab to search for specific hotels. You can also book directly from the search results by tapping a hotel and selecting dates.
6. Navigate to the Bookings tab. Here you can view your existing reservations filtered by "Ongoing", "Completed", and "Canceled". 
7. In the Bookings tab, you can view ticket details, cancel an ongoing booking, or check the refund status of canceled ones. You can also remove canceled hotel if there are no need to persist this information.
8. Switch to the Profile tab to view and edit your profile. Update your name, phone number, or upload a new profile picture. A success message will briefly appear when changes are saved.
9. To log out, tap the logout button in the top right corner of the Profile tab header.

### Walkthrough for Registered User
1. On the auth screen choose Sign Up
2. Enter email and password (min 4 symbols)
3. You will be logged in uppon succesful registration.
4. Above functionality as Authenticated User without first two points.

## Functional Guide

### 1. Project Overview
**Application Name:** React Native Hotel Booking App

**Application Category:** Travel

**Main Purpose:** This React Native mobile application allows users to browse available hotels, search for accommodations, make hotel bookings, and manage their reservations. The app provides both guest and authenticated user experiences, enabling travelers to book hotels and view their booking history seamlessly.

---

### 2. User Access & Permissions

**Guest Access (Not Authenticated):**
- Browse all available hotels on the Home screen
- Search for hotels by name, city, country, and type
- View detailed hotel information (photos, amenities, location)
- Cannot make bookings or access profile features
- Limited to read-only access; can only logout and return to auth screen

**Authenticated User Access:**
- All guest features plus:
- Make hotel bookings with date selection (check-in/check-out)
- View and manage personal bookings with status tracking (Ongoing, Completed, Canceled)
- Update user profile (name, phone number, profile picture)
- View booking cancellation options and refund status
- Persistent session that survives app restarts

---

### 3. Authentication & Session Handling

**Authentication Flow:**
1. **App Startup:** When the app launches, it checks if a user session exists in secure storage
2. **Status Check:** `AuthProvider` determines if the user is authenticated, a guest, or unauthenticated
3. **Navigation Decision:** If authenticated/guest, shows main app (tabs); otherwise shows auth screens
4. **Login/Registration:** User enters credentials → validated → sent to Backendless backend → on success, access token and user data stored
5. **Logout:** User triggers logout → session cleared from storage, logged out from backend → redirects to auth screens

**Session Persistence:**
- User session (access token + user data) stored via `usePersistedState` hook with secure storage
- Automatic login happens on app restart if valid token exists
- Sessions expire server-side; 401/3064 errors trigger graceful logout with "session expired" message
- API interceptor detects token expiration and clears local auth automatically

**Token Expiration Handling:**
- When a 401 or error code 3064 ("Not existing user token") is received, the API interceptor triggers logout
- No token refresh attempted (Backendless doesn't support it) — clean logout instead

---

### 4. Navigation Structure

**Root Navigation Logic:**
- **Unauthenticated:** Shows `AuthNavigator` (Auth Gate → Login/Registration screens)
- **Authenticated/Guest:** Shows Bottom Tab Navigator with 4 main sections

**Main Navigation (Guest Users):**
- **Home Tab:** Browse featured and recommended hotels with refresh capability
- **Search Tab:** Search and filter all hotels by various criteria
- **Bookings Tab:** is disabled
- **Profile Tab:** View guest user static information; logout button in header
*** only Authenticated Users
- **Bookings Tab:** View user's existing bookings filtered by status (Ongoing, Completed, Canceled)
- **Profile Tab:** View and edit user information; logout button in header

**Nested Navigation:**
- Follow tab contains stack navigation for details screens
- **Home → Hotel Details:** Shows full hotel info, gallery, description
- **Home → Booking Date:** Date picker for reservation
- **Search → Hotel Details:** Close possibilities as Home detail flow
- **Bookings → Booking Card:** Shows booking details with cancel/view options

---

### 5. List → Details Flow

**List Screens:**
- **Home Screen:** Displays hotels in four category tabs (Recommended, Popular, Trending and Luxury) on press display hotel cards details showing name, location, image galery photo, description, price. From here can book hotel dates with calculated price
- **Search Screen:** Displays filtered hotels based on user search input; shows "No hotels found" when collection is empty.Here are also avaiable posability to book
- **Booking Screen:** Shows user's bookings in tabs (Ongoing, Completed, Canceled) with status badges with posobility to cancel, view and remove

**Details Screens & Navigation:**
- Tapping a hotel card navigates to `HotelScreen` with hotel data via route params
- Hotel details show: full image gallery, location, amenities, description, price per night, rating, guest capacity
- "Book Now" button navigates to `BookingDateScreen` for date selection
- Bookings show full details with cancel button (if applicable) or refund status

**Data Received via Route Params:**
```javascript
// Hotel to Details
{ 
  id, name, image_url, city, country_code, price_per_night, ratings, kind, occupancy, gallery, location, description, auth 
}

// Booking details
{ objectId, hotelId, checkIn, checkOut, state, numGuests }
```

---

### 6. Data Sources & Backend

**Backend Type:** Custom REST API (Backendless)

**Base URLs:**
- General API: `process.env.EXPO_PUBLIC_API_URL`
- Authentication API: `process.env.EXPO_PUBLIC_API_URL_AUTH`

**Main Data Collections:**
- **Hotels:** Browse, filter, and display hotel listings
- **Bookings:** Create, read, update, and delete user reservations
- **Users:** Manage user profiles and authentication

**API Client:** Axios with custom interceptor for error handling (detects 401/3064 auth errors)

---

### 7. Core Features & Functionalities

**Authentication:**
- Login with email/password with validation
- User registration with validation
- Guest login (limited access)
- Persistent sessions with automatic re-login
- Secure logout with session clearing
- Input validation (email format, password strength, phone format)

**Hotel Browsing:**
- View all hotels on Home screen with tabs (Recommended/Other)
- Search hotels by name, city, country, type, occupancy
- Filter and real-time search results
- Display "No hotels found" when search yields empty results
- View detailed hotel information with photo gallery

**Booking Management:**
- Make hotel reservations with date selection
- View booking status (Ongoing, Completed, Canceled)
- Cancel bookings with refund status tracking
- Filter bookings by status in tabbed view
- Automatic status updates (e.g., Ongoing → Completed when check-in date passes)

**User Profile:**
- View profile information (name, email, phone)
- Edit name and phone with validation
- Upload profile picture via device camera
- View/update account details
- Refresh profile data

---

### 8. Error Handling & User Feedback

**Error Types Handled:**
- **Network Errors:** Displayed to user with error message
- **Validation Errors:** Field-specific messages (invalid email, weak password, invalid phone)
- **Authentication Errors (401/3064):** Graceful logout with session expired message
- **API Errors:** Generic error messages in booking, user, and hotel screens
- **Empty States:** "No hotels found" message in search and booking screens

**User Feedback:**
- Error message present for failed operations
- Success messages (e.g., "Profile updated" appears above Update button for 3 seconds)
- Loading indicators during async operations
- Pull-to-refresh on Home, Search, Booking, Profile screens

---

### 9. State Management

**Context API Providers:**
- **AuthProvider:** Manages login, register, logout, authentication state
- **HotelProvider:** Manages hotel list data and fetching
- **BookingProvider:** Manages booking CRUD operations and status
- **UserProvider:** Manages user profile updates

**Key Hooks:**
- `useAuth()`: Access auth functions and user info
- `useHotel()`: Access hotel data and fetch handlers
- `useBooking()`: Access booking operations
- `useUser()`: Access user profile functions
- `usePersistedState()`: Custom hook for AsyncStorage persistence

**Local State:**
- Component-level state for form inputs, loading, errors
- UI states like active tabs, visibility toggles, refresh states

---

### 10. Input Validation & Data Constraints

**Validation Rules:**
- **Email:** Must match regex pattern for valid email format
- **Password:** Minimum 4 characters
- **Name:** Minimum 2 characters, trimmed
- **Phone:** Bulgarian phone format (validates +359, 00359, or 0 prefix with 9 digits)

**Keyboard Navigation:**
- Profile screen: Return key on name field navigates to phone field
- Phone field: Accepts only digits (0-9); filters out non-numeric input
- Proper keyboard types for email, password, and numeric inputs

---

### 11. Loading & Refresh States

**Loading Indicators:**
- Activity spinner shown during login, registration, data fetching
- Loading state managed in each Provider with `isLoading` flag
- Prevents duplicate submissions while loading

**Refresh Controls:**
- Pull-to-refresh on Home, Search, Booking, and Profile screens
- `RefreshControl` component triggers data refetch
- `onRefresh` callbacks update local state with fresh data
- Refresh state managed with `setRefreshing` boolean

**Loading Delays:**
- Initial app load waits up to 2 seconds for persistent session check
- Ensures smooth transitions and prevents UI flashing

---

### 12. Components & UI Architecture

**Key Components:**
- **HotelCard:** Displays hotel preview (name, image, city, price, rating, reviews)
- **BookingCard:** Shows booking info with cancel/view options
- **Search:** Search input component with real-time filtering
- **Tab:** Custom tab component for status filtering
- **SuccessBookingModal:** Success confirmation after booking
- **CancelBookingModal:** Confirmation and reason capture for cancellations
- **TicketModal:** Displays booking ticket/receipt
- **Camera:** Native image picker for profile photo upload
- **Empty:** Displays "No data available" or custom message when list is empty

**Styling Approach:**
- Centralized `defaultTheme` with primary color, grey, etc.
- Component-level `styles` using React Native `StyleSheet`
- Responsive design using Expo metrics (e.g., `useBottomTabBarHeight()`)
- Safe area handling with `SafeAreaView` and `SafeAreaProvider`
- Icons from `@expo/vector-icons` (Ionicons, MaterialCommunityIcons)