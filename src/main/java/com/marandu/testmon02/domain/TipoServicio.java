package com.marandu.testmon02.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A TipoServicio.
 */
@Entity
@Table(name = "tipo_servicio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoServicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "estado")
    private Boolean estado;

    @ManyToOne
    @JsonIgnoreProperties("tiposervicios")
    private Relevamiento relevamiento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public TipoServicio nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean isEstado() {
        return estado;
    }

    public TipoServicio estado(Boolean estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public Relevamiento getRelevamiento() {
        return relevamiento;
    }

    public TipoServicio relevamiento(Relevamiento relevamiento) {
        this.relevamiento = relevamiento;
        return this;
    }

    public void setRelevamiento(Relevamiento relevamiento) {
        this.relevamiento = relevamiento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoServicio)) {
            return false;
        }
        return id != null && id.equals(((TipoServicio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoServicio{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", estado='" + isEstado() + "'" +
            "}";
    }
}
