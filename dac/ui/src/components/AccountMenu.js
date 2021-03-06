/*
 * Copyright (C) 2017 Dremio Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import config from 'utils/config';

import fileABug from 'utils/fileABug';
import { getLoginUrl } from 'routes';

import Menu from 'components/Menus/Menu';
import MenuItem from 'components/Menus/MenuItem';
import DividerHr from 'components/Menus/DividerHr';

export class AccountMenu extends Component {
  static propTypes = {
    closeMenu: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    showIntercom: false
  }

  onAccountSettings = () => {
    this.props.closeMenu();
    this.context.router.push({pathname: '/account/info'});
  }

  onLogOut = () => {
    this.props.closeMenu();
    // it will trigger logout action in authMiddleware
    this.context.router.replace(getLoginUrl());
  }

  onFileABug = () => {
    this.props.closeMenu();
    fileABug();
  }

  render() {
    return <Menu>
      {config.shouldEnableBugFiling && <MenuItem isInformational>
        <span style={styles.menuInformation}>{la('Internal Build')}</span>
      </MenuItem>}
      {config.shouldEnableBugFiling && <MenuItem onTouchTap={this.onFileABug}>{la('File a Bug')}</MenuItem>}
      {config.shouldEnableBugFiling && <DividerHr/>}
      <MenuItem onTouchTap={this.onAccountSettings}>{la('Account Settings')}</MenuItem>
      <MenuItem onTouchTap={this.onLogOut}>{la('Log Out')}</MenuItem>
    </Menu>;
  }
}

export default connect(null, null)(AccountMenu);

const styles = {
  menuInformation: {
    fontStyle: 'italic',
    color: '#999'
  }
};
