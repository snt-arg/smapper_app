import client from '@/shared/api/client'

async function sendPoweroffSignal() {
  await client.post('/computer/power/poweroff')
}

async function sendRebootSignal() {
  await client.post('/computer/power/reboot')
}

export const OnboardAPI = {
  sendPoweroffSignal,
  sendRebootSignal,
}

export default {
  sendPoweroffSignal,
  sendRebootSignal,
}
