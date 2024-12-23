export type License = {
  name: string;
  identifier: string;
  templatePath: string;
};

export const licenses: License[] = [
  {
    name: 'Apache License 2.0',
    identifier: 'Apache-2.0',
    templatePath: 'licenses/apache-2.0',
  },
  {
    name: 'GNU General Public License v3.0',
    identifier: 'GPL-3.0',
    templatePath: 'licenses/gpl-3.0',
  },
  {
    name: 'MIT License',
    identifier: 'MIT',
    templatePath: 'licenses/mit',
  },
  {
    name: 'BSD 2-Clause "Simplified" License',
    identifier: 'BSD-2-Clause',
    templatePath: 'licenses/bsd-2-clause',
  },
  {
    name: 'BSD 3-Clause "New" or "Revised" License',
    identifier: 'BSD-3-Clause',
    templatePath: 'licenses/bsd-3-clause',
  },
  {
    name: 'Boost Software License 1.0',
    identifier: 'BSL-1.0',
    templatePath: 'licenses/bsl-1.0',
  },
  {
    name: 'Creative Commons Zero v1.0 Universal',
    identifier: 'CC0-1.0',
    templatePath: 'licenses/cc0-1.0',
  },
  {
    name: 'Eclipse Public License 2.0',
    identifier: 'EPL-2.0',
    templatePath: 'licenses/epl-2.0',
  },
  {
    name: 'GNU Affero General Public License v3.0',
    identifier: 'AGPL-3.0',
    templatePath: 'licenses/agpl-3.0',
  },
  {
    name: 'GNU General Public License v2.0',
    identifier: 'GPL-2.0',
    templatePath: 'licenses/gpl-2.0',
  },
  {
    name: 'GNU Lesser General Public License v2.1',
    identifier: 'LGPL-2.1',
    templatePath: 'licenses/lgpl-2.1',
  },
  {
    name: 'Mozilla Public License 2.0',
    identifier: 'MPL-2.0',
    templatePath: 'licenses/mpl-2.0',
  },
  {
    name: 'The Unlicense',
    identifier: 'Unlicense',
    templatePath: 'licenses/unlicense',
  },
];
