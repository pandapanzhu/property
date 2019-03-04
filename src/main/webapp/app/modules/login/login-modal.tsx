import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader id="login-title" toggle={handleClose}>
            请登录
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <strong>登录失败!</strong> 请检查你的账号密码是否正确.
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField name="username" label="用户名" placeholder="请输入用户名" required errorMessage="用户名不能为空!" autoFocus />
                <AvField name="password" type="password" label="密码" placeholder="请输入密码" required errorMessage="密码不能为空!" />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="rememberMe" /> 记住我
                  </Label>
                </AvGroup>
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
            <Alert color="warning">
              <Link to="/reset/request">忘记密码?</Link>
            </Alert>
            <Alert color="warning">
              <span>还没有账号?</span> <Link to="/register">点击注册</Link>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              取消
            </Button>{' '}
            <Button color="primary" type="submit">
              登录
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;
