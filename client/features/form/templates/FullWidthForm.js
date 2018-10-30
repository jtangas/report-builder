import React from 'react';
import {
  Grid, Segment, Form, Button, Dropdown,
} from 'semantic-ui-react';
import { FieldArray } from 'formik';
import PropTypes from 'prop-types';

import { textFields, fieldHasLabel } from 'features/form/config';

const RenderField = props => {
  const {
    field,
    touched,
    handleChange,
    handleBlur,
    errors,
    values,
  } = props;

  const selectProps = field.type === 'select'
    ? {
      label: field.label,
      placeholder: field.placeholder,
      options: field.options,
      name: field.name,
    }
    : null;

  return (
    <Form.Field
      width={field.width}
    >
      {
        field.label && fieldHasLabel.includes(field.type)
        && (
          <label
            htmlFor={field.name}
            style={{
              textAlign: 'left',
              color: fieldHasLabel.includes(field.type) && errors[field.name] && touched[field.name] ? 'red' : null,
            }}
          >
            {field.label}
          </label>
        )
      }
      {
        textFields.includes(field.type) && (
          <input
            type={field.type}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[field.name]}
            name={field.name}
            placeholder={field.placeholder}
          />
        )
      }
      {
        field.type === 'checkbox' && (
          <Form.Checkbox
            onChange={(e, data) => {
              e.target = data;
              handleChange(e);
            }}
            name={field.name}
            label={field.label}
          />
        )
      }
      {
        selectProps !== null && (
          <Dropdown
            width={field.width}
            selection
            {...selectProps}
            fluid
            value={values[field.name]}
            onChange={(e, data) => {
              const d = { target: data };
              handleChange(d);
            }}
          />
        )
      }
      {
        field.type === 'checkboxGroup' && (
          <FieldArray
            name={field.name}
            render={arrayHelpers => (
              <div
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'column',
                  display: 'flex',
                }}
              >
                <div style={{
                  flexDirection: 'row', flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                }}
                >
                  {field.options.map(option => (
                    <div
                      key={`phenotype_${option.id}`}
                      style={{ flexShrink: 1, flexGrow: 1, flexBasis: '25%' }}
                    >
                      <Form.Checkbox
                        name={option.name}
                        value={option.id}
                        label={option.name}
                        onChange={(e, data) => {
                          if (data.checked) arrayHelpers.push(option.id);
                          else {
                            const idx = values[field.name].indexOf(option.id);
                            arrayHelpers.remove(idx);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
        )
      }
      {
        textFields.includes(field.type)
        && !field.label
        && touched[field.name]
        && errors[field.name]
        && (<p>{errors[field.name]}</p>)
      }
    </Form.Field>
  );
};

const FormFieldGroup = props => {
  const {
    group,
    ...rest
  } = props;

  return (
    <Form.Group>
      {
        group.map((field, i) => (
          <RenderField
            key={`field_input_${i + field}`}
            field={field}
            {...rest}
          />
        ))
      }
    </Form.Group>
  );
};

FormFieldGroup.propTypes = {
  group: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default props => {
  const {
    formFields,
    handleSubmit,
    ...rest
  } = props;

  return (
    <Grid
      style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        margin: 0,
      }}
    >
      <Grid.Column>
        <Form onSubmit={handleSubmit}>
          <Segment>
            {
              formFields.map((field, i) => {
                if (Array.isArray(field)) {
                  return <FormFieldGroup key={`field_group_${i + field}`} group={field} {...rest} />;
                }
                return <RenderField key={`form_field_${i + field}`} field={field} {...rest} />;
              })
            }
            <Button type="submit" color="teal" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

// FullWidthForm.propTypes = {
//  formFields: PropTypes.oneOfType([
//    PropTypes.objectOf(PropTypes.array),
//  ]).isRequired,
//  handleSubmit: PropTypes.func.isRequired,
// };
