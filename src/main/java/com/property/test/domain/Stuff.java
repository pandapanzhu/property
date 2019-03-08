package com.property.test.domain;



import com.property.test.service.dto.UserDTO;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Stuff.
 */
@Entity
@Table(name = "stuff")
public class Stuff implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private String userId;

    @NotNull
    @Column(name = "stuffname", nullable = false)
    private String stuffname;

    @NotNull
    @Pattern(regexp = "^[0-9]{11}$")
    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "idcard", nullable = false)
    private String idcard;

    @Column(name = "address")
    private String address;

    @Column(name = "remark")
    private String remark;

    @Column(name = "dlt")
    private Integer dlt;

    @Column(name = "create_user")
    private String create_user;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "update_user")
    private String update_user;

    @Column(name = "update_date")
    private Instant update_date;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStuffname() {
        return stuffname;
    }

    public void setStuffname(String stuffname) {
        this.stuffname = stuffname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getDlt() {
        return dlt;
    }

    public void setDlt(Integer dlt) {
        this.dlt = dlt;
    }

    public String getCreate_user() {
        return create_user;
    }

    public void setCreate_user(String create_user) {
        this.create_user = create_user;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public String getUpdate_user() {
        return update_user;
    }

    public void setUpdate_user(String update_user) {
        this.update_user = update_user;
    }

    public Instant getUpdate_date() {
        return update_date;
    }

    public void setUpdate_date(Instant update_date) {
        this.update_date = update_date;
    }

    public Stuff(User newUser, UserDTO userDTO) {
        this.userId = newUser.getId().toString();
        this.stuffname = newUser.getLogin();
        this.address =userDTO.getAddress();
        this.idcard = userDTO.getIdcard();
        this.phone = userDTO.getPhone();
        this.email = newUser.getEmail();
    }

    public Stuff() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Stuff stuff = (Stuff) o;
        if (stuff.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stuff.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stuff{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", stuffname='" + getStuffname() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", idcard='" + getIdcard() + "'" +
            ", address='" + getAddress() + "'" +
            ", remark='" + getRemark() + "'" +
            ", dlt=" + getDlt() +
            ", create_user='" + getCreate_user() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", update_user='" + getUpdate_user() + "'" +
            ", update_date='" + getUpdate_date() + "'" +
            "}";
    }
}
