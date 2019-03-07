package com.property.test.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A PropertyServe.
 */
@Entity
@Table(name = "PropertyServe")
public class PropertyServe implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @NotNull
    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "jhi_type")
    private String type;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public PropertyServe userId(String userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getReason() {
        return reason;
    }

    public PropertyServe reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getType() {
        return type;
    }

    public PropertyServe type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRemark() {
        return remark;
    }

    public PropertyServe remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getDlt() {
        return dlt;
    }

    public PropertyServe dlt(Integer dlt) {
        this.dlt = dlt;
        return this;
    }

    public void setDlt(Integer dlt) {
        this.dlt = dlt;
    }

    public String getCreate_user() {
        return create_user;
    }

    public PropertyServe create_user(String create_user) {
        this.create_user = create_user;
        return this;
    }

    public void setCreate_user(String create_user) {
        this.create_user = create_user;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public PropertyServe createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public String getUpdate_user() {
        return update_user;
    }

    public PropertyServe update_user(String update_user) {
        this.update_user = update_user;
        return this;
    }

    public void setUpdate_user(String update_user) {
        this.update_user = update_user;
    }

    public Instant getUpdate_date() {
        return update_date;
    }

    public PropertyServe update_date(Instant update_date) {
        this.update_date = update_date;
        return this;
    }

    public void setUpdate_date(Instant update_date) {
        this.update_date = update_date;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PropertyServe propertyServe = (PropertyServe) o;
        if (propertyServe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), propertyServe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PropertyServe{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", reason='" + getReason() + "'" +
            ", type='" + getType() + "'" +
            ", remark='" + getRemark() + "'" +
            ", dlt=" + getDlt() +
            ", create_user='" + getCreate_user() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", update_user='" + getUpdate_user() + "'" +
            ", update_date='" + getUpdate_date() + "'" +
            "}";
    }
}
