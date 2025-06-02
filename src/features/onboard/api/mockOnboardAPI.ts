function sendPoweroffSignal() {
  console.log('Powering off...')
}

function sendRebootSignal() {
  console.log('Rebooting off...')
}

export const OnboardAPI = {
  sendPoweroffSignal,
  sendRebootSignal,
}

export default {
  sendPoweroffSignal,
  sendRebootSignal,
}
