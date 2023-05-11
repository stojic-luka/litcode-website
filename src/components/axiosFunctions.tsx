import axios from "axios";

async function getFromServer(url: string) {
  try {
    var { data } = await axios.post(url);
    return data;
  } catch (err) {}
}
async function postToServer(url: string, payload: Object) {
  try {
    var { data } = await axios.post(url, payload);
    return data;
  } catch (err) {}
}

const sendCodeToServer = (problemId: string, source_code: string, lang: string) => {
  const ret = postToServer("http://localhost:8080/compile", { id: problemId, source_code: btoa(source_code), lang: lang });
  console.log(ret);
};
const getDefaultCodeFromServer = async (problemId: string, lang: string) => {
  const ret = await postToServer("http://localhost:8080/defaultcode", { id: problemId, lang: lang });
  console.log(ret);
  return ret;
};

export { sendCodeToServer, getDefaultCodeFromServer };
