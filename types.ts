
export interface Scores {
  attendance: number;
  absence: number;
  late: number;
  medicalLeave: number;
  proxy: number;
  internalReferralsGiven: number;
  externalReferralsGiven: number;
  internalReferralsReceived: number;
  externalReferralsReceived: number;
  guestsBrought: number;
  oneToOne: number;
  businessValue: number;
  educationUnits: number;
  totalWeeks: number;
  trafficLightScore: number;
  
  // 紅綠燈預測分數
  attendanceScore: number;
  referralScore: number;
  oneToOneScore: number;
  businessValueScore: number;
  trainingScore: number;
  guestScore: number;
  
  // 滾動六個月內尚缺
  rolling6Months_referralDeficitWeekly: number;
  rolling6Months_oneToOneDeficitBiweekly: number;
  rolling6Months_businessValueDeficit: number;
  rolling6Months_trainingDeficit: number;
  rolling6Months_guestDeficit: number;
}

export interface Member {
  id: number;
  name: string;
  scores: Scores;
}

export interface MonthlyData {
  [month: string]: Member[];
}
