import React from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export type IRegisterProps = DispatchProps;

export interface IRegisterState {
  password: string;
}

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: ''
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1 id="register-title">Registration</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm id="register-form" onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="username"
                label="用户名"
                placeholder="请输入用户名"
                validate={{
                  required: { value: true, errorMessage: '用户名不能为空' },
                  pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: '用户名包含了非法字符' },
                  minLength: { value: 1, errorMessage: '用户名长度为1-50' },
                  maxLength: { value: 50, errorMessage: '用户名长度为1-50' }
                }}
              />
              <AvField
                name="email"
                label="邮箱"
                placeholder="请输入你的邮箱"
                type="email"
                validate={{
                  required: { value: true, errorMessage: '邮箱不能为空' },
                  minLength: { value: 5, errorMessage: '邮箱长度为5-250' },
                  maxLength: { value: 254, errorMessage: '邮箱长度为5-250' }
                }}
              />
              <AvField
                name="phone"
                label="手机号码"
                placeholder="请输入你的手机号码"
                type="phone"
                validate={{
                  required: { value: true, errorMessage: '手机号码不能为空' },
                  minLength: { value: 5, errorMessage: '手机号码长度为5-12' },
                  maxLength: { value: 12, errorMessage: '手机号码长度为5-12' }
                }}
              />
              <AvField
                name="address"
                label="房间号"
                placeholder="1栋1单元101"
                validate={{
                  required: { value: true, errorMessage: '房间号不能为空' },
                  minLength: { value: 5, errorMessage: '房间号长度为5-12' },
                  maxLength: { value: 12, errorMessage: '房间号长度为5-12' }
                }}
              />

              <AvField
                name="firstPassword"
                label="密码"
                placeholder="请输入密码"
                type="password"
                onChange={this.updatePassword}
                validate={{
                  required: { value: true, errorMessage: '密码不能为空' },
                  minLength: { value: 4, errorMessage: '密码长度为4-50' },
                  maxLength: { value: 50, errorMessage: '密码长度为4-50' }
                }}
              />
              <PasswordStrengthBar password={this.state.password} />
              <AvField
                name="secondPassword"
                label="确认密码"
                placeholder="请再次输入密码"
                type="password"
                validate={{
                  required: { value: true, errorMessage: '密码不能为空' },
                  minLength: { value: 4, errorMessage: '密码长度为4-50' },
                  maxLength: { value: 50, errorMessage: '密码长度为4-50' },
                  match: { value: 'firstPassword', errorMessage: '密码确认失败，请输入正确的密码' }
                }}
              />
              <Button id="register-submit" color="primary" type="submit">
                注册
              </Button>
              <Button id="register-submit" color="success" type="button">
                登录
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = { handleRegister, reset };
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(RegisterPage);
