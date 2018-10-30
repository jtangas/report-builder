import * as Yup from 'yup';

export const Values = {
  reportName: '',
  reportType: '',
  phenotypes: [],
  template: '',
  language: '',
  test: '',
};

export const Validation = Yup.object().shape({
  reportName: Yup.string()
    .required('Report Name is Required'),
  reportType: Yup.string()
    .required('Report Type is Required'),
  template: Yup.string()
    .required('Report Template is Required'),
  language: Yup.string()
    .required('Language is Required'),
  phenotypes: Yup.array()
    .min(1),
});

export const Fields = [
  {
    type: 'text',
    name: 'reportName',
    label: 'Report Name',
    placeholder: 'Your report name',
  },
  [
    {
      type: 'select',
      name: 'reportType',
      label: 'Report Type',
      placeholder: 'Please Select A Report Type',
      options: [
        { key: 1, text: 'Medical', value: 'md' },
        { key: 2, text: 'Consumer', value: 'consumer' },
      ],
      width: 6,
    },
    {
      type: 'select',
      name: 'template',
      label: 'Template',
      placeholder: 'Select A Template',
      options: [
        { key: 1, text: 'Pathway FIT', value: 'fit' },
        { key: 2, text: 'Pathway FIT Short', value: 'fit-short' },
      ],
      width: 6,
    },
    {
      type: 'select',
      name: 'language',
      label: 'Language',
      placeholder: 'Select A Language',
      options: [
        { key: 1, text: 'English', value: 'en' },
        { key: 2, text: 'Spanish', value: 'es' },
        { key: 3, text: 'Russian', value: 'ru' },
      ],
      width: 4,
    },
  ],
  {
    type: 'checkboxGroup',
    name: 'phenotypes',
    label: 'Phenotype Group A',
    options: [
      { id: 1, name: 'Phenotype 1' },
      { id: 2, name: 'Phenotype 2' },
      { id: 3, name: 'Phenotype 3' },
      { id: 4, name: 'Phenotype 4' },
      { id: 5, name: 'Phenotype 5' },
      { id: 6, name: 'Phenotype 6' },
      { id: 7, name: 'Phenotype 7' },
      { id: 8, name: 'Phenotype 8' },
      { id: 9, name: 'Phenotype 9' },
      { id: 10, name: 'Phenotype 10' },
      { id: 11, name: 'Phenotype 11' },
      { id: 12, name: 'Phenotype 12' },
      { id: 13, name: 'Phenotype 13' },
      { id: 14, name: 'Phenotype 14' },
    ],
  },
  {
    type: 'checkboxGroup',
    name: 'phenotypes',
    label: 'Phenotype Group B',
    options: [
      { id: 51, name: 'Phenotype 51' },
      { id: 52, name: 'Phenotype 52' },
      { id: 53, name: 'Phenotype 53' },
      { id: 54, name: 'Phenotype 54' },
      { id: 55, name: 'Phenotype 55' },
      { id: 56, name: 'Phenotype 56' },
      { id: 57, name: 'Phenotype 57' },
      { id: 58, name: 'Phenotype 58' },
      { id: 59, name: 'Phenotype 59' },
      { id: 60, name: 'Phenotype 60' },
      { id: 61, name: 'Phenotype 61' },
      { id: 62, name: 'Phenotype 62' },
      { id: 63, name: 'Phenotype 63' },
      { id: 64, name: 'Phenotype 64' },
    ],
  },
  {
    type: 'hidden',
    name: 'user',
  },
];
