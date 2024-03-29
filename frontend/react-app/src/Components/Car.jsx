import { useEffect, useState } from "react";

const getCars = async () => {
  const response = await fetch("http://localhost:3000/api/cars");
  var resData = await response.json();
  return JSON.parse(resData);
};

//checks if an array is empty.
const isEmpty = (obj) => {
  if (obj === undefined) {
    return true;
  }

  if (obj.length === 0) {
    return true;
  } else {
    return false;
  }
};

const getEntity = (carObj) => {
  var carEntityTitle = [];
  if (isEmpty(carObj)) {
    return;
  } else {
    //gets the keys from the entities
    for (var key in carObj) {
      carEntityTitle.push(key);
    }
    //console.log("CarEntityTitle: ", carEntityTitle);
    return carEntityTitle;
  }
};

const getKeys = (carObj) => {
  var keys = [];
  //console.log("this is the getKeys function: ", keyObj);
  if (isEmpty(carObj)) {
    return;
  } else {
    for (var key in carObj) {
      keys.push(carObj[key]);
    }
    //console.log("carKeys: ", keys);
    return keys;
  }
};

//Get the nested key names;
const getNestedKeys = (carObj) => {
  var nestedKey = [];
  if (isEmpty(carObj)) {
    return;
  } else {
    for (var i = 0; i < carObj.length; i++) {
      nestedKey.push(getEntity(carObj[i]));
    }
    //keyValue.shift();
    //console.log("nested key values: ",  nestedKey);
    return nestedKey;
  }
};

//get nested keyValues
const getNestedKeyValues = (carObj) => {
  var nestedKeyValue = [];
  if (isEmpty(carObj)) {
    return;
  } else {
    for (var i = 0; i < carObj.length; i++) {
      nestedKeyValue.push(getKeys(carObj[i]));
    }
    //nestedKeyValue.shift();
    //console.log("nestedKeyValue: ", nestedKeyValue);
    return nestedKeyValue;
  }
};

// eslint-disable-next-line
const printObj = (objVarName, obj) => {
  console.log(objVarName + ": ");
  console.log(obj);
};

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////Components are below and above are functions in javascript///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

function checkIfArrayEmpty(entitys) {
  if (!Array.isArray(entitys) || entitys.length === 0) {
    // Render a loading state or a message indicating data is loading
    return true;
  }
}

const EntityInfo = ({
  entitys,
  carLicense,
  carLicenseValue,
  nestedCarKey,
  nestedCarKeyValues,
}) => {
  const [nestCarKeyTitle, setNestCarKeyTitle] = useState([]); // This is the carKey title (make, mode, etc..)
  const [nestCarKeyValue, setNestCarKeyValue] = useState([]); // This is the carKey Value (what type of make, mode, and etc...)

  function clickHandler({ enTitle: selectedEnTitle }) {
    let index = entitys.indexOf(selectedEnTitle);
    setNestCarKeyTitle(nestedCarKey[index]);
    setNestCarKeyValue(nestedCarKeyValues[index]);
    console.log(
      "title: ",
      selectedEnTitle,
      "Index: ",
      index,
      "info of index: ",
      nestCarKeyTitle
    );
  }

  if (checkIfArrayEmpty(entitys) === true) {
    return <div>Loading...</div>;
  }

  /**
   * Styles
   */

  const bodyStyle = {
    backgroundColor: "#000",
    color: "#00ff00",
    fontFamily: "'Courier New', monospace",
  };
  
  const TableCellStyle = {
    borderCollapse: "collapse",
    width: "400px",
    margin: "20px auto",
    border: "1px solid #00ff00",
  };
  
  const TableRows = {
    backgroundColor: "#003300",
    cellColor: "#00ff00"
  }
  
  const TableCellStyles = {
    padding: "10px",
    borderBottom: "2px solid #00ff00",
    fontWeight: "bold",
  };

  const plateStyle = {
    position:"relative",
    left:"840px",
    bottom:"40px",
    backgroundColor: '#000',
    color: '#0f0',
    padding: '8px 16px',
    border: '2px solid #0f0',
    fontFamily: 'Courier New, monospace',
    textTransform: 'uppercase',
    borderRadius: '5px',
    display: 'inline-block',
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #00b300, #004d00)',
    color: '#fff',
    padding: '16px 32px',
    border: '2px solid #00ff00',
    borderRadius: '10px',
    margin: '10px',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
    fontSize: '18px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    boxShadow: '3px 3px 8px rgba(0, 255, 0, 0.5)',
  };

  

  return (
    <>
    <body style={{bodyStyle}}>
      <h1 style={plateStyle}>License Plate: {carLicenseValue}</h1>
      <div className="Button">
        {entitys.map((enTitle) => (
          <button style = {buttonStyle} key={enTitle} onClick={() => clickHandler({ enTitle })}>
            {enTitle}
          </button>
        ))}
      </div>
      <body style={bodyStyle}>
      <table className="nestedCarKeyTitle" style={TableCellStyle}>
        <tbody>
            {nestCarKeyTitle.map((nestCarKeyTitle, index) => (
              <>
                <tr style={TableRows}>
                <td key={nestCarKeyTitle} style={TableCellStyles}>{nestCarKeyTitle}</td>
                <td key={nestCarKeyValue[index]} style={TableCellStyles}>{nestCarKeyValue[index]}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      </body>
      </body>
    </>
  );
};

export default function Car() {
  const [carEntityTitleState, setCarEntityTitleState] = useState([]);
  const [nestedCarKeyState, setNestedCarKeyState] = useState([]);
  const [nestedCarKeyValuesState, setNestedCarKeyValuesState] = useState([]);
  const [carLicenseState, setCarLicenseState] = useState([]);
  const [carLicenseValueState, setCarLicenseValueState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCars(); // Fetch the car data

        // Data manipulation
        const carEntityTitle = getEntity(data);
        const carLicense = carEntityTitle?.shift();
        carEntityTitle?.pop();
        const carKey = getKeys(data);
        carKey?.pop();
        const carLicenseValue = carKey?.shift();
        const nestedCarKey = getNestedKeys(carKey);
        const nestedCarKeyValues = getNestedKeyValues(carKey);

        // Update state variables
        setCarEntityTitleState(carEntityTitle || []);
        //setCarKeyState(carKey || []);
        setNestedCarKeyState(nestedCarKey || []);
        setNestedCarKeyValuesState(nestedCarKeyValues || []);
        setCarLicenseState(carLicense || "");
        setCarLicenseValueState(carLicenseValue || "");

        //Perform operations or set states as needed
        printObj("carEntityTitle ", carEntityTitle);
        printObj("carLicense ", carLicense);
        printObj("carKey ", carKey);
        printObj("carLicenseValue ", carLicenseValue);
        printObj("nestedCarKey ", nestedCarKey);
        printObj("nestedCarKeyValues ", nestedCarKeyValues);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Invoke the function to fetch and process data
  }, []);

  return (
    <div>
      <h1>Vehicle Information</h1>
      <EntityInfo
        entitys={carEntityTitleState}
        carLicense={carLicenseState}
        carLicenseValue={carLicenseValueState}
        nestedCarKey={nestedCarKeyState}
        nestedCarKeyValues={nestedCarKeyValuesState}
      />
    </div>
  );
}
