import { useEffect, useState } from "react";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [xmlData, setXmlData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("books").select();
      if (error) console.log("error", error);
      if (data) {
        setXmlData(data);
        // console.log(data);
      }
    };
    getData();
  }, []);

  const xmlFormat = `
    <?xml version="1.0" encoding="UTF-8"?>
      <catalog>
        ${xmlData.map((item) => `
            <book category="${item?.category}">
              <title>${item?.title}</title>
              <author>${item?.author}</author>
              <year>${item?.year}</year>
              <price>${item?.price}</price>
            </book>
          `)
      .join("")}
      </catalog>
      
  `;

  return (
    <>
      <div>
        <h1>XML DATA PRACTICE</h1>
        <pre className="code">
          <code>{xmlFormat}</code>
        </pre>
      </div>
    </>
  );
}

export default App;
