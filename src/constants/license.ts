export const License = {
  apacheLicense20: 'Apache License 2.0',
  gnuGeneralPublicLicenseV30: 'GNU General Public License v3.0',
  mitLicense: 'MIT License',
  bsd2ClauseSimplifiedLicense: 'BSD 2-Clause "Simplified" License',
  bsd3ClauseNewOrRevisedLicense: 'BSD 3-Clause "New" or "Revised" License',
  boostSoftwareLicense10: 'Boost Software License 1.0',
  creativeCommonsZeroV10Universal: 'Creative Commons Zero v1.0 Universal',
  eclipsePublicLicense20: 'Eclipse Public License 2.0',
  gnuAfferoGeneralPublicLicenseV30: 'GNU Affero General Public License v3.0',
  gnuGeneralPublicLicenseV20: 'GNU General Public License v2.0',
  gnuLesserGeneralPublicLicenseV21: 'GNU Lesser General Public License v2.1',
  mozillaPublicLicense20: 'Mozilla Public License 2.0',
  theUnlicense: 'The Unlicense',
} as const;

export type License = (typeof License)[keyof typeof License];
