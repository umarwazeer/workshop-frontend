<template>
  <div class="q-pa-md">
    <h2 class="text-h5">Account Settings</h2>
    <div class="q-gutter-md">
      <!-- User Information -->
      <q-card class="q-mb-md">
        <q-card-section class="q-pa-md">
          <h3 class="text-h6">User Information</h3>
          <div class="q-mb-md">
            <q-input outlined v-model="user.username" label="Username" />
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="user.email" label="Email" />
          </div>
          <div>
            <q-uploader
              v-model="user.profilePic"
              accept="image/*"
              label="Profile Picture"
              @added="onFileAdded"
              @removed="onFileRemoved"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- Professional Information -->
      <q-card class="q-mb-md">
        <q-card-section class="q-pa-md">
          <h3 class="text-h6">Professional Information</h3>
          <div class="q-mb-md">
            <q-input outlined v-model="user.jobTitle" label="Job Title" />
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="user.department" label="Department" />
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="user.company" label="Company" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Change Password -->
      <q-card>
        <q-card-section class="q-pa-md">
          <h3 class="text-h6">Change Password</h3>
          <div class="q-mb-md">
            <q-input outlined v-model="passwords.currentPassword" label="Current Password" type="password" />
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="passwords.newPassword" label="New Password" type="password" />
          </div>
          <div>
            <q-input outlined v-model="passwords.confirmPassword" label="Confirm New Password" type="password" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Save Button -->
      <div class="text-center q-mt-md">
        <q-btn color="primary" label="Save" @click="saveChanges" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountSettings",
  data() {
    return {
      user: {
        username: "",
        email: "",
        profilePic: null,
        jobTitle: "",
        department: "",
        company: ""
      },
      passwords: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    onFileAdded(file) {
      // Handle file added event
    },
    onFileRemoved() {
      // Handle file removed event
    },
    saveChanges() {
      // Save changes logic
    }
  }
};
</script>

<style>
/* Add your custom styles here */
</style>
