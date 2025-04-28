interface INotesType {
  title: string;
  desc: string;
  type: {
    id: string;
    desc: string;
  };
}

interface ReqtHeadersType {
  userid: string;
  authorization: string;
  noteid: string;
  pagination: boolean;
  page?: {
    skip: number;
    limit: number;
  };
}
interface LogoutReqtHeadersType {
  sessionid: string;
}
interface ReqtParamsType {
  noteid?: string;
  skip: number;
  limit: number;
}

export { INotesType, ReqtHeadersType, ReqtParamsType, LogoutReqtHeadersType };
