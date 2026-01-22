import { Button, MenuItem } from "@mui/material"
import { forOwn } from "lodash"
import { Select, Switches, TextField, Form } from "mui-rff"  // NEW: Import Form if needed
import React from "react"
import { Form as FinalForm } from "react-final-form"  // Clarify import

export const SettingsForm = () => (
  <FinalForm
    onSubmit={values => {
      // NEW: Basic val before save (e.g., apiBaseUrl format)
      if (!values.apiBaseUrl || !values.apiBaseUrl.startsWith('http')) {
        alert('API Base URL must start with http:// or https://')  // Simple UX
        return
      }
      forOwn(values, (value, key) => localStorage.setItem(key, value))
      // NEW: Log submit for debug
      console.log('Settings saved:', { language: values.language, developerMode: values.developerMode })
      window.location.reload()
    }}
    initialValues={{
      language: "en",
      apiBaseUrl: "http://localhost:3001/api/v1",
      apiWebSocketUrl: "ws://localhost:3001",
      developerMode: true,
    }}
  >
    {({ handleSubmit, form: { reset }, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit} aria-label="Settings Form">  // NEW: Aria for accessibility
        <Select
          name="language"
          label="Language"
          formControlProps={{ margin: "normal" }}
        >
          <MenuItem value="de">de</MenuItem>
          <MenuItem value="en_US">en_US</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">fr</MenuItem>
          <MenuItem value="it">it</MenuItem>
          <MenuItem value="pt_BR">pt_BR</MenuItem>
          <MenuItem value="ru">ru</MenuItem>
          <MenuItem value="si">si</MenuItem>
          <MenuItem value="ta">ta</MenuItem>
          <MenuItem value="uk">uk</MenuItem>
          <MenuItem value="zh_CN">zh_CN</MenuItem>
        </Select>
        <TextField
          name="apiBaseUrl"
          label="API Base URL"
          placeholder="http://yourDomain/api/v1"
          required
          helperText="Must start with http://"  // NEW: Helper
        />
        <TextField
          name="apiWebSocketUrl"
          label="API WebSocket URL"
          placeholder="ws://yourDomain"
          required
        />
        <Switches
          name="developerMode"
          required
          data={{ label: "Developer Mode", value: null }}
        />
        <div>
          <Button type="submit" disabled={submitting}>
            Connect
          </Button>
          <Button
            type="button"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </Button>
        </div>
        <pre aria-label="Current Values">{JSON.stringify(values, null, 2)}</pre>
      </form>
    )}
  </FinalForm>
)