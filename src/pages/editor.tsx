import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Tab, Tabs } from "@mui/material";
import axios from "axios";

import AceEditor from "react-ace";
import ReactAce from "react-ace/lib/ace";

import { sendCodeToServer, getDefaultCodeFromServer } from "../components/axiosFunctions";

interface Props {
  setTitleEvent: (newTitle: string) => void;
}
export default function Editor({ setTitleEvent }: Props) {
  const codeInputRef = useRef<ReactAce>(null);
  const selectBoxRef = useRef<HTMLSelectElement>(null);

  const [code, setCode] = useState<string>("");
  const [params, setParams] = useState<URLSearchParams>();
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTitleEvent("LitCode - ");

    const timer = setTimeout(() => {
      setHasError(true);
    }, 7500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setParams(new URLSearchParams(location.search));
  }, [location]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  if (!params?.get("problem")) {
    if (hasError)
      return (
        <div>
          <h1>No required params</h1>
        </div>
      );
    return (
      <div>
        <h1>Loading args</h1>
      </div>
    );
  }

  return (
    <>
      <div>
        <div>
          {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs>
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Tri" />
            </Tabs>
          </Box> */}
          <span>{params.get("problem")}</span>
          <span></span>
        </div>
      </div>
      <div>
        <select
          ref={selectBoxRef}
          onChange={async () => {
            let code = await getDefaultCodeFromServer("1_sumNums", selectBoxRef.current?.value as string);
            setCode(code);
          }}
        >
          <option value="python">Python</option>
          <option value="golang">Golang</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
        </select>
        <div style={{ height: "100%", width: 500 }}>
          <AceEditor
            ref={codeInputRef}
            mode={selectBoxRef.current?.value}
            theme="dracula"
            value={code}
            name="asdf"
            onChange={handleCodeChange}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              highlightActiveLine: false,
              tabSize: 2,
              showPrintMargin: false,
              wrap: true,
            }}
          />
        </div>
        <button onClick={() => sendCodeToServer("1_sumNums", code, selectBoxRef.current?.value as string)}>send to server</button>
      </div>
    </>
  );
}
