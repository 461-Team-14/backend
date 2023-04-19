# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server.models.package_data import PackageData  # noqa: F401,E501
from swagger_server.models.package_metadata import PackageMetadata  # noqa: F401,E501
from swagger_server import util


class Package(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, metadata: PackageMetadata=None, data: PackageData=None):  # noqa: E501
        """Package - a model defined in Swagger

        :param metadata: The metadata of this Package.  # noqa: E501
        :type metadata: PackageMetadata
        :param data: The data of this Package.  # noqa: E501
        :type data: PackageData
        """
        self.swagger_types = {
            'metadata': PackageMetadata,
            'data': PackageData
        }

        self.attribute_map = {
            'metadata': 'metadata',
            'data': 'data'
        }
        self._metadata = metadata
        self._data = data

    @classmethod
    def from_dict(cls, dikt) -> 'Package':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Package of this Package.  # noqa: E501
        :rtype: Package
        """
        return util.deserialize_model(dikt, cls)

    @property
    def metadata(self) -> PackageMetadata:
        """Gets the metadata of this Package.


        :return: The metadata of this Package.
        :rtype: PackageMetadata
        """
        return self._metadata

    @metadata.setter
    def metadata(self, metadata: PackageMetadata):
        """Sets the metadata of this Package.


        :param metadata: The metadata of this Package.
        :type metadata: PackageMetadata
        """
        if metadata is None:
            raise ValueError("Invalid value for `metadata`, must not be `None`")  # noqa: E501

        self._metadata = metadata

    @property
    def data(self) -> PackageData:
        """Gets the data of this Package.


        :return: The data of this Package.
        :rtype: PackageData
        """
        return self._data

    @data.setter
    def data(self, data: PackageData):
        """Sets the data of this Package.


        :param data: The data of this Package.
        :type data: PackageData
        """
        if data is None:
            raise ValueError("Invalid value for `data`, must not be `None`")  # noqa: E501

        self._data = data
