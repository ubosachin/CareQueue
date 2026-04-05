export interface Patient {
  id: string;
  name: string;
  token: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  symptoms: string;
  age: number;
  department: string;
  assignedDoctor?: string;
  arrivalTime: string;
  estimatedWaitTime: number; // in minutes
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'In Consultation' | 'Available' | 'On Break';
  patientsInQueue: number;
  averageConsultationTime: number; // in minutes
}

export const MOCK_DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Physician', status: 'In Consultation', patientsInQueue: 4, averageConsultationTime: 12 },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiologist', status: 'Available', patientsInQueue: 0, averageConsultationTime: 20 },
  { id: '3', name: 'Dr. Emily Brown', specialty: 'Pediatrician', status: 'In Consultation', patientsInQueue: 7, averageConsultationTime: 15 },
  { id: '4', name: 'Dr. James Wilson', specialty: 'Orthopedic', status: 'On Break', patientsInQueue: 3, averageConsultationTime: 18 },
  { id: '5', name: 'Dr. Lisa Gupta', specialty: 'Neurologist', status: 'Available', patientsInQueue: 2, averageConsultationTime: 25 },
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'p1', name: 'John Doe', token: 'CQ-101', priority: 'Medium', symptoms: 'Severe Headache', age: 45, department: 'Neurology', assignedDoctor: 'Dr. Lisa Gupta', arrivalTime: '10:30 AM', estimatedWaitTime: 15 },
  { id: 'p2', name: 'Jane Smith', token: 'CQ-102', priority: 'Emergency', symptoms: 'Chest Pain', age: 62, department: 'Cardiology', assignedDoctor: 'Dr. Michael Chen', arrivalTime: '10:45 AM', estimatedWaitTime: 2 },
  { id: 'p3', name: 'Alice Brown', token: 'CQ-103', priority: 'Low', symptoms: 'Regular Checkup', age: 28, department: 'General Medicine', assignedDoctor: 'Dr. Sarah Johnson', arrivalTime: '11:00 AM', estimatedWaitTime: 45 },
  { id: 'p4', name: 'Robert Wilson', token: 'CQ-104', priority: 'High', symptoms: 'Fever & Chills', age: 35, department: 'General Medicine', arrivalTime: '11:15 AM', estimatedWaitTime: 30 },
];

export class CareAI {
  static predictWaitTime(patient: Patient, doctor: Doctor): number {
    const priorityWeight = { 'Emergency': 0.1, 'High': 0.5, 'Medium': 0.8, 'Low': 1.2 };
    const baseTime = doctor.patientsInQueue * doctor.averageConsultationTime;
    return Math.max(2, Math.round(baseTime * priorityWeight[patient.priority]));
  }

  static getOptimizationSuggestions(queue: Patient[], doctors: Doctor[]) {
    const suggestions = [];
    const overloadedDoctors = doctors.filter(d => d.patientsInQueue > 5);
    const availableDoctors = doctors.filter(d => d.status === 'Available');

    if (overloadedDoctors.length > 0 && availableDoctors.length > 0) {
      suggestions.push({
        type: 'Reallocation',
        message: `Move 3 patients to ${availableDoctors[0].name} to reduce wait time by 18%`,
        efficiencyBoost: '18%',
        priority: 'High'
      });
    }

    const emergencyCases = queue.filter(p => p.priority === 'Emergency');
    if (emergencyCases.length > 0) {
      suggestions.push({
        type: 'Emergency Alert',
        message: 'Prioritize P-102 (Jane Smith) for Cardiology immediately.',
        efficiencyBoost: 'N/A',
        priority: 'Critical'
      });
    }

    return suggestions;
  }

  static getQueueEfficiencyScore(): number {
    return 94.5;
  }

  static getAverageWaitTime(): number {
    return 12.4;
  }
}
