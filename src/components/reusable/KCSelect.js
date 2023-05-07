import React from "react";
import Select from "react-select";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const KCSelect = (props) => {
  const theme = useTheme();
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      background: "#fff",
    }),
    control: (base, state) => ({
      ...base,
      background: props.background ?? theme.palette.primary.main,
      borderRadius: props.radius ?? 30,
      padding: "0 20px",
      color: props.textColor ?? "#fff",
      // Overwrittes the different states of border
      borderColor: props.borderColor ?? theme.palette.primary.main,
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused
          ? props.borderColor ?? theme.palette.primary.main
          : props.borderColor ?? theme.palette.primary.main,
      },
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "1em",
      color: "#cacce0",
      fontWeight: 400,
    }),
    valueContainer: (base) => ({
      ...base,
      flexWrap: "initial",
    }),
    menu: (base) => ({
      ...base,
      position: "absolute",
      zIndex: 20,
    }),
  };

  return (
    <div className="App" style={props.style}>
      {props.fieldLabel !== "" ? (
        <Typography sx={{ fontSize: 14, mb: 1 }}>{props.fieldlabel}</Typography>
      ) : (
        ""
      )}
      <Select
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        options={props.options ?? []}
        styles={customStyles}
        isClearable={true}
        isMulti={props.isMulti}
        theme={(selecTheme) => ({
          ...selecTheme,
          borderRadius: 0,
          colors: {
            // ...selecTheme.colors,
            primary25: props.background ?? theme.palette.secondary.light,
            primary: props.background ?? theme.palette.primary.main,
          },
        })}
        isDisabled={props.isDisabled}
      />
    </div>
  );
};
