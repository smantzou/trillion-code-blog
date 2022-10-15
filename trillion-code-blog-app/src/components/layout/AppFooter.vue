<template>
  <div class="footer grid grid-cols-none">
    <div class="footer-main grid grid-cols-4">
      <div class="logo grid grid-rows-3 grid-cols-none">
        <div class="row-start-2">
          <img width="110px" src="../../assets/svgs/trillion-logo.svg" />
        </div>
        <div class="row-start-3 flex flex-row space-x-5">
          <div>
            <img
              width="20px"
              src="../../assets/svgs/facebook-icon.svg"
              alt=""
            />
          </div>
          <div>
            <img width="20px" src="../../assets/svgs/twitter-icon.svg" alt="" />
          </div>
          <div>
            <img width="20px" src="../../assets/svgs/youtube-icon.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="support grid grid-rows-3 grid-cols-none">
        <div class="support-title">
          <span><strong>Υποστήριξη</strong></span>
        </div>
        <div class="phone flex flex-row justify-evenly">
          <img width="10px" src="../../assets/svgs/phone-icon.svg" alt="" />
          <span>218 218 9966</span>
        </div>
        <div class="mail flex flex-row justify-evenly">
          <img width="10px" src="../../assets/svgs/email-icon.svg" alt="" />
          <span>info@webjar.gr</span>
        </div>
      </div>
      <div class="address grid grid-rows-3 grid-cols-none">
        <div class="address-title">
          <span><strong>Διεύθυνση</strong></span>
        </div>
        <div class="address-location flex flex-row">
          <div>
            <img src="../../assets/svgs/location-icon.svg" alt="" />
          </div>
          <div class="address-text">
            <span>Λεωφ. Κηφισίας 324,</span>
          </div>
        </div>
        <div class="address-end">
          <span> Χαλάνδρι 152 33</span>
        </div>
      </div>
      <div class="company grid grid-rows-3 grid-cols-none">
        <div class="company-title">
          <span><strong>Εταιρεία</strong></span>
        </div>
        <div>
          <span>Ποιοί Είμαστε</span>
        </div>
        <div>
          <span>Θέσεις καριέρας</span>
        </div>
      </div>
    </div>
    <div class="footer-details grid grid-rows-none grid-cols-3">
      <div><span>@Copyright Webjar 2022</span></div>
      <div><span>ΑΠΟΡΡΗΤΟ | COOKIES</span></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.logo {
  height: 5rem;
  grid-gap: 1.5rem 0rem;
}
.phone {
  background-color: white;
  border-radius: 10rem;
  color: black;
  font-size: xx-small;
  height: 1.5rem;
  width: 6rem;
  align-items: center;
}
.support {
  height: 5rem;
  grid-gap: 1rem 0rem;
}

.support-title {
  height: 1.5rem;
  font-size: xx-small;
  justify-self: start;
}
.company {
  font-size: xx-small;
  justify-self: start;
  height: 3rem;
  grid-gap: 1rem 0rem;
}

.footer-main {
  padding: 0px 7rem;
  margin-bottom: 2rem;
}

.footer {
  background-image: radial-gradient(
    ellipse farthest-side at left 10%,
    #39beff 90%,
    #181818
  );
  color: white;
  border-radius: 10px;
  line-height: 50px;
}

.mail {
  background-color: white;
  border-radius: 10rem;
  color: black;
  font-size: xx-small;
  height: 1.5rem;
  width: 6rem;
  align-items: center;
}

.footer-details {
  font-size: 10px;
}

.address {
  height: 5rem;
  grid-gap: 1rem 0rem;
  font-size: xx-small;
  justify-self: start;
}
.address-location {
  align-items: center;
}
.address-title {
  font-size: xx-small;
  justify-self: start;
}
.address-text {
  word-break: break-word;
}
.address-end {
  margin-top: -2rem;
  margin-left: -0.5rem;
}
</style>
