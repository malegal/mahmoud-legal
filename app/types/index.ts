export interface CaseData {
  case: {
    client_name: string;
    client_role: string;
    opponent_name: string;
    court_name: string;
    case_number: string;
    case_year: string;
    circuit: string;
    case_subject: string;
  };
  sessions: Array<{
    session_date: string;
    case_status: string;
    decision: string;
  }>;
  _timestamp: number;
}
